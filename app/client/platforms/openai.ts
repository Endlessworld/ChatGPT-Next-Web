import {
  DEFAULT_API_HOST,
  DEFAULT_MODELS,
  OpenaiPath,
  REQUEST_TIMEOUT_MS,
} from "@/app/constant";
import {
  ChatMessage,
  useAccessStore,
  useAppConfig,
  useChatStore,
} from "@/app/store";

import { ChatOptions, getHeaders, LLMApi, LLMModel, LLMUsage } from "../api";
import Locale from "../../locales";
import {
  EventStreamContentType,
  fetchEventSource,
} from "@fortaine/fetch-event-source";
import { prettyObject } from "@/app/utils/format";
import { functionCall } from "@/app/utils";
import { getClientConfig } from "@/app/config/client";

export interface OpenAIListModelResponse {
  object: string;
  data: Array<{
    id: string;
    object: string;
    root: string;
  }>;
}

export class ChatGPTApi implements LLMApi {
  private disableListModels = true;

  path(path: string): string {
    let openaiUrl = useAccessStore.getState().openaiUrl;
    const apiPath = "/api/openai";

    if (openaiUrl.length === 0) {
      const isApp = !!getClientConfig()?.isApp;
      openaiUrl = isApp ? DEFAULT_API_HOST : apiPath;
    }
    if (openaiUrl.endsWith("/")) {
      openaiUrl = openaiUrl.slice(0, openaiUrl.length - 1);
    }
    if (!openaiUrl.startsWith("http") && !openaiUrl.startsWith(apiPath)) {
      openaiUrl = "https://" + openaiUrl;
    }
    return [openaiUrl, path].join("/");
  }

  extractMessage(res: any) {
    return Array.isArray(res)
      ? res[0].choices[0]?.message?.content
      : res.choices[0].message.content ?? "";
  }

  async chat(options: ChatOptions) {
    const messages = options.messages.map((v) => ({
      role: v.role,
      content: v.content,
      name: v.name,
    }));

    const modelConfig = {
      ...useAppConfig.getState().modelConfig,
      ...useChatStore.getState().currentSession().mask.modelConfig,
      ...{
        model: options.config.model,
      },
    };
    const functions = options.messages[messages.length - 1].functions;
    const requestPayload = {
      messages,
      stream: options.config.stream,
      // stream: options.messages[messages.length - 1].functions ? false : options.config.stream,
      model: modelConfig.model,
      temperature: modelConfig.temperature,
      presence_penalty: modelConfig.presence_penalty,
      frequency_penalty: modelConfig.frequency_penalty,
      top_p: modelConfig.top_p,
      functions: functions,
      function_call: options.messages[messages.length - 1].function_call,
      max_tokens: Math.max(modelConfig.max_tokens, 1024),
      // max_tokens: Math.max(modelConfig.max_tokens, 1024),
    };

    console.log("[Request] openai payload: ", requestPayload);

    const shouldStream = requestPayload.stream;
    const controller = new AbortController();
    options.onController?.(controller);

    try {
      const chatPath = this.path(OpenaiPath.ChatPath);
      const chatPayload = {
        method: "POST",
        body: JSON.stringify(requestPayload),
        signal: controller.signal,
        headers: getHeaders(),
      };

      // make a fetch request
      const requestTimeoutId = setTimeout(
        () => controller.abort(),
        REQUEST_TIMEOUT_MS,
      );

      if (shouldStream) {
        let responseText = "";
        let finished = false;
        const queues: string[] = [];
        const finish = () => {
          if (!finished) {
            options.onFinish(responseText);
            finished = true;
          }
        };

        controller.signal.onabort = finish;
        let function_call_arguments_json = "";
        let function_call_name = "";
        fetchEventSource(chatPath, {
          ...chatPayload,
          async onopen(res) {
            clearTimeout(requestTimeoutId);
            const contentType = res.headers.get("content-type");
            if (
              !res.ok ||
              !res.headers
                .get("content-type")
                ?.startsWith(EventStreamContentType) ||
              res.status !== 200
            ) {
              const responseTexts = [responseText];
              let extraInfo = await res.clone().text();
              try {
                const resJson = await res.clone().json();
                extraInfo = prettyObject(resJson);
                if (res.status === 429) {
                  const timestamp = (resJson?.timestamp || 0) + 60 * 60 * 1000;
                  responseTexts.push(Locale.Auth.Limit);
                }
              } catch {}
              if (extraInfo) {
                responseTexts.push(extraInfo);
              }
              if (res.status === 401) {
                responseTexts.push(Locale.Error.Unauthorized);
              }
              responseText = responseTexts.join("\n\n");
              return finish();
            }
          },
          onmessage(msg) {
            if (msg.data === "[DONE]" || finished) {
              return finish();
            }
            const text = msg.data;
            try {
              const json = JSON.parse(text);
              // console.log(json);
              if (json.choices[0].finish_reason) {
                if (json.choices[0].finish_reason === "function_call") {
                  if (options.onFunction) {
                    finished = true;
                    return options.onFunction({
                      function: function_call_name,
                      arguments: function_call_arguments_json,
                    });
                  } else {
                    console.log("未实现函数回调");
                  }
                }
              }
              if (json.choices[0]?.delta?.function_call) {
                function_call_arguments_json +=
                  json.choices[0]?.delta?.function_call?.arguments;
                if (json.choices[0]?.delta?.function_call?.name) {
                  function_call_name =
                    json.choices[0]?.delta?.function_call?.name;
                }
              } else {
                const delta =
                  json.choices[0]?.delta?.content ||
                  json.choices[0]?.message?.content;
                if (delta) {
                  if (options.config.model.startsWith("gpt")) {
                    responseText += delta;
                    options.onUpdate?.(responseText, delta);
                  } else {
                    for (const char of delta) {
                      queues.push(char);
                    }
                    if (queues.length > 10) {
                      let index = 0;
                      const intervalId = window.setInterval(() => {
                        if (queues.length > 0) {
                          const text: string | undefined = `${
                            queues.shift() || ""
                          }${queues.shift() || ""}`;
                          responseText += text;
                          options.onUpdate?.(responseText, "text1");
                        } else {
                          index++;
                          if (index > 0) {
                            window.clearInterval(intervalId);
                            options.onUpdate?.(responseText, "");
                          }
                        }
                      }, 75);
                    }
                  }
                }
              }
            } catch (e) {
              console.error(e, "[Request] parse error", text, msg);
            }
          },
          onclose() {
            finish();
          },
          onerror(e) {
            // options.onError?.(e);
            finish();
            throw e;
          },
          openWhenHidden: true,
        });
      } else {
        const res = await fetch(chatPath, chatPayload);
        clearTimeout(requestTimeoutId);
        const resJson = await res.json();
        console.log("resJson >>>>>>>", resJson);
        const message = this.extractMessage(resJson);
        options.onFinish(message);
      }
    } catch (e) {
      console.log("[Request] failed to make a chat request", e);
      options.onError?.(e as Error);
    }
  }
  async usage() {
    const formatDate = (d: Date) =>
      `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    const ONE_DAY = 1 * 24 * 60 * 60 * 1000;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startDate = formatDate(startOfMonth);
    const endDate = formatDate(new Date(Date.now() + ONE_DAY));

    const [used, subs] = await Promise.all([
      fetch(
        this.path(
          `${OpenaiPath.UsagePath}?start_date=${startDate}&end_date=${endDate}`,
        ),
        {
          method: "GET",
          headers: getHeaders(),
        },
      ),
      fetch(this.path(OpenaiPath.SubsPath), {
        method: "GET",
        headers: getHeaders(),
      }),
    ]);

    if (used.status === 401) {
      throw new Error(Locale.Error.Unauthorized);
    }

    if (!used.ok || !subs.ok) {
      throw new Error("Failed to query usage from openai");
    }

    const response = (await used.json()) as {
      total_usage?: number;
      error?: {
        type: string;
        message: string;
      };
    };

    const total = (await subs.json()) as {
      hard_limit_usd?: number;
    };

    if (response.error && response.error.type) {
      throw Error(response.error.message);
    }

    if (response.total_usage) {
      response.total_usage = Math.round(response.total_usage) / 100;
    }

    if (total.hard_limit_usd) {
      total.hard_limit_usd = Math.round(total.hard_limit_usd * 100) / 100;
    }

    return {
      used: response.total_usage,
      total: total.hard_limit_usd,
    } as LLMUsage;
  }

  async models(): Promise<LLMModel[]> {
    if (this.disableListModels) {
      return DEFAULT_MODELS.slice();
    }

    const res = await fetch(this.path(OpenaiPath.ListModelPath), {
      method: "GET",
      headers: {
        ...getHeaders(),
      },
    });

    const resJson = (await res.json()) as OpenAIListModelResponse;
    const chatModels = resJson.data?.filter((m) => m.id.startsWith("gpt-"));
    console.log("[Models]", chatModels);

    if (!chatModels) {
      return [];
    }

    return chatModels.map((m) => ({
      name: m.id,
      available: true,
    }));
  }
}
export { OpenaiPath };
