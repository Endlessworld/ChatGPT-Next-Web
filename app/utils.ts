import { useEffect, useState } from "react";
import { showToast } from "./components/ui-lib";
import Locale, { getLang } from "./locales";
import { nanoid } from "nanoid";
import { Prompt, SearchService, usePromptStore } from "@/app/store/prompt";
import { ClientApi, RequestMessage } from "./client/api";
import { DEFAULT_MODELS, ModelProvider } from "@/app/constant";

export function trimTopic(topic: string) {
  // Fix an issue where double quotes still show in the Indonesian language
  // This will remove the specified punctuation from the end of the string
  // and also trim quotes from both the start and end if they exist.
  return (
    topic
      // fix for gemini
      .replace(/^["“”*]+|["“”*]+$/g, "")
      .replace(/[，。！？”“"、,.!?*]*$/, "")
  );
}

export function isIdeaPlugin() {
  if (typeof window == "undefined") {
    return false;
  }
  return (window as any).cefQuery;
}

// 导出一个名为isBase64的函数，用于检查输入的字符串是否为Base64编码
export function isBase64(str: string) {
  try {
    // 尝试对输入的字符串进行Base64解码，然后再进行Base64编码，判断结果是否与原始字符串相等
    return btoa(atob(str)) == str;
  } catch (err) {
    // 如果出现错误，则返回false，表示输入的字符串不是Base64编码
    return false;
  }
}

// 导出一个函数loadFunctions，该函数会返回一个数组
export function loadFunctions(): any[] {
  // 从localStorage中获取名为"functions"的键所对应的值（默认值为"[]"）
  let functionsJson: string = localStorage.getItem("functions") || "[]";

  // 使用JSON.parse将字符串转化为数组类型
  return JSON.parse(functionsJson);
}

export function fetchPrompt() {
  if (typeof window == "undefined") {
    return;
  }
  const PROMPT_URL = (window as any).location.origin + "/prompts.json";
  type PromptList = Array<[string, string]>;
  fetch(PROMPT_URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      let fetchPrompts = [res.en, res.cn];
      if (getLang() === "cn") {
        fetchPrompts = fetchPrompts.reverse();
      }
      const builtinPrompts = fetchPrompts.map((promptList: PromptList) => {
        return promptList.map(
          ([title, content]) =>
            ({
              id: nanoid(),
              title,
              content,
              createdAt: Date.now(),
            }) as Prompt,
        );
      });

      const userPrompts = usePromptStore.getState().getUserPrompts() ?? [];

      const allPromptsForSearch = builtinPrompts
        .reduce((pre, cur) => pre.concat(cur), [])
        .filter((v) => !!v.title && !!v.content);
      SearchService.count.builtin = res.en.length + res.cn.length;
      SearchService.init(allPromptsForSearch, userPrompts);
    });
}

export function getVoices(
  callback: (voices: SpeechSynthesisVoice[]) => void,
): void {
  let voices = speechSynthesis.getVoices();
  if (voices.length) {
    callback(voices);
    return;
  }
  speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
    callback(voices);
  };
}

// export async function getVoices(): Promise<SpeechSynthesisVoice[]> {
//   return new Promise((resolve) => {
//     let voices = speechSynthesis.getVoices();
//     if (voices.length) {
//       resolve(voices);
//       return;
//     }
//     speechSynthesis.onvoiceschanged = () => {
//       voices = speechSynthesis.getVoices();
//       resolve(voices);
//     };
//   });
// }
export async function ideaMessage(
  message: Record<string, unknown> = {
    event: "replace",
    message: "",
    session: "",
  },
) {
  if (message.event === "") {
    return;
  }
  // console.log((window as any).cefQuery);
  try {
    if ((window as any).cefQuery) {
      console.log("cefQuery", message);
      (window as any).cefQuery({
        request: JSON.stringify(message),
        onSuccess: function (cefResponse: any) {
          if (message.event === "replace") {
            showToast(Locale.Replace.Success);
          }
          if (message.event === "diff") {
            showToast(Locale.Merge.Success);
          }
          if (message.event === "auto") {
            // showToast("自动回写成功");
          }
          if (message.event === "function_call") {
            console.log(cefResponse);
            localStorage.setItem("function-response", cefResponse);
            showToast("function call success");
          }
        },
        onFailure: function (error_code: any, error_message: any) {
          if (message.event === "replace") {
            showToast(error_message);
          }
          if (message.event === "diff") {
            showToast(error_message);
          }
        },
      });
    } else {
      console.log("cefQuery not available");
    }
  } catch (error) {
    console.error("cefQuery error", error);
  }
}

export async function Merge(messageText: string, session: string) {
  ideaMessage({ event: "diff", message: messageText, session: session });
}

export async function Replace(messageText: string, session: string) {
  ideaMessage({ event: "replace", message: messageText, session: session });
}

export async function functionCall(messageText: string, session: string) {
  ideaMessage({
    event: "function_call",
    message: messageText,
    session: session,
  });
}

export function getProjectContextAwareness() {
  let content = `\u200D\u200D`;
  if (isIdeaPlugin()) {
    const projectContext = localStorage.getItem("project-context");
    if (projectContext) {
      let enableContext = JSON.parse(projectContext).enableContext;
      let projectContent = JSON.parse(projectContext).content;
      let contexts =
        "以下是我项目的配置或代码片段，你需要以此作为每个回答的参考依据:\n";
      if (enableContext && projectContent) {
        contexts += `|Option   |Content   |
|----   |----|`;
        contexts += "\r\n";
        // console.log(contexts);
        for (const contextsKey in projectContent) {
          contexts += `|${contextsKey}|${projectContent[contextsKey].replaceAll(
            "|",
            "\\|",
          )}|`;
          contexts += "\r\n";
        }
        // console.log(contexts);
        return content.concat(contexts);
      }
    }
  }
  return content;
}

export async function copyToClipboard(text: string) {
  try {
    if (window.__TAURI__) {
      window.__TAURI__.writeText(text);
    } else {
      await navigator.clipboard.writeText(text);
    }

    showToast(Locale.Copy.Success);
  } catch (error) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      showToast(Locale.Copy.Success);
    } catch (error) {
      showToast(Locale.Copy.Failed);
    }
    document.body.removeChild(textArea);
  }
}

export async function downloadAs(text: string, filename: string) {
  if (window.__TAURI__) {
    const result = await window.__TAURI__.dialog.save({
      defaultPath: `${filename}`,
      filters: [
        {
          name: `${filename.split(".").pop()} files`,
          extensions: [`${filename.split(".").pop()}`],
        },
        {
          name: "All Files",
          extensions: ["*"],
        },
      ],
    });

    if (result !== null) {
      try {
        await window.__TAURI__.fs.writeTextFile(result, text);
        showToast(Locale.Download.Success);
      } catch (error) {
        showToast(Locale.Download.Failed);
      }
    } else {
      showToast(Locale.Download.Failed);
    }
  } else {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text),
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}

export function compressImage(file: File, maxSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent: any) => {
      const image = new Image();
      image.onload = () => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let width = image.width;
        let height = image.height;
        let quality = 0.9;
        let dataUrl;

        do {
          canvas.width = width;
          canvas.height = height;
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
          ctx?.drawImage(image, 0, 0, width, height);
          dataUrl = canvas.toDataURL("image/jpeg", quality);

          if (dataUrl.length < maxSize) break;

          if (quality > 0.5) {
            // Prioritize quality reduction
            quality -= 0.1;
          } else {
            // Then reduce the size
            width *= 0.9;
            height *= 0.9;
          }
        } while (dataUrl.length > maxSize);

        resolve(dataUrl);
      };
      image.onerror = reject;
      image.src = readerEvent.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function readFromFile() {
  return new Promise<string>((res, rej) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";

    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        res(e.target.result);
      };
      fileReader.onerror = (e) => rej(e);
      fileReader.readAsText(file);
    };

    fileInput.click();
  });
}

export function isIOS() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return size;
}

export const MOBILE_MAX_WIDTH = 600;

export function useMobileScreen() {
  const { width } = useWindowSize();

  return width <= MOBILE_MAX_WIDTH;
}

export async function clearCache() {
  let clearCache = async function () {
    localStorage.clear();
    // sessionStorage.clear();
    indexedDB.deleteDatabase("localforage");
    // del sw cache
    const cacheKeys = await caches.keys();
    for (const cacheKey of cacheKeys) {
      await caches.open(cacheKey).then(async (cache) => {
        const requests = await cache.keys();
        return await Promise.all(
          requests.map((request) => {
            console.log(`del cache : `, request.url);
            return cache.delete(request);
          }),
        );
      });
    }
  };
  await clearCache();
}

export function useUserInfo(): any {
  return getUserInfo();
}

export function getUserInfo(): any {
  let userInfo = getCookie("user_info");
  return JSON.parse(userInfo) as {
    user_id: string;
    display_name: string;
    user_email: string;
    user_login: string;
    custom_avatar: string;
    vip_level: string;
    vip_exp_date: Date;
    session_token: string;
  };
}

export function useUserAvatar(): any {
  let userInfo = getCookie("user_info");
  return JSON.parse(userInfo).custom_avatar;
}

export function getCookie(name: string | any[]) {
  if (typeof document !== "undefined") {
    const cookieString = (document as any).cookie;
    const cookies = cookieString.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
  }
  return "{}";
}

export function isFirefox() {
  return (
    typeof navigator !== "undefined" && /firefox/i.test(navigator.userAgent)
  );
}

export function selectOrCopy(el: HTMLElement, content: string) {
  const currentSelection = window.getSelection();

  if (currentSelection?.type === "Range") {
    return false;
  }
  // console.log(content);
  copyToClipboard(content);

  return true;
}

function getDomContentWidth(dom: HTMLElement) {
  const style = window.getComputedStyle(dom);
  const paddingWidth =
    parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  const width = dom.clientWidth - paddingWidth;
  return width;
}

function getOrCreateMeasureDom(id: string, init?: (dom: HTMLElement) => void) {
  let dom = document.getElementById(id);

  if (!dom) {
    dom = document.createElement("span");
    dom.style.position = "absolute";
    dom.style.wordBreak = "break-word";
    dom.style.fontSize = "14px";
    dom.style.transform = "translateY(-200vh)";
    dom.style.pointerEvents = "none";
    dom.style.opacity = "0";
    dom.id = id;
    document.body.appendChild(dom);
    init?.(dom);
  }

  return dom!;
}

export function autoGrowTextArea(dom: HTMLTextAreaElement) {
  const measureDom = getOrCreateMeasureDom("__measure");
  const singleLineDom = getOrCreateMeasureDom("__single_measure", (dom) => {
    dom.innerText = "TEXT_FOR_MEASURE";
  });

  const width = getDomContentWidth(dom);
  measureDom.style.width = width + "px";
  measureDom.innerText = dom.value !== "" ? dom.value : "1";
  measureDom.style.fontSize = dom.style.fontSize;
  const endWithEmptyLine = dom.value.endsWith("\n");
  const height = parseFloat(window.getComputedStyle(measureDom).height);
  const singleLineHeight = parseFloat(
    window.getComputedStyle(singleLineDom).height,
  );

  const rows =
    Math.round(height / singleLineHeight) + (endWithEmptyLine ? 1 : 0);

  return rows;
}

export function getCSSVar(varName: string) {
  return getComputedStyle(document.body).getPropertyValue(varName).trim();
}

export default function dispatchEventStorage() {
  const signSetItem = localStorage.setItem;
  localStorage.setItem = function (key, val) {
    signSetItem.apply(this, [key, val]);
    if (isIdeaPlugin()) {
      let setEvent: any = new Event("storageSetEvent");
      setEvent.key = key;
      setEvent.newValue = val;
      window.dispatchEvent(setEvent);
    }
  };
}

/**
 * Detects Macintosh
 */
export function isMacOS(): boolean {
  if (typeof window !== "undefined") {
    let userAgent = window.navigator.userAgent.toLocaleLowerCase();
    const macintosh = /iphone|ipad|ipod|macintosh/.test(userAgent);
    return !!macintosh;
  }
  return false;
}

export function getMessageTextContent(message: RequestMessage) {
  if (typeof message.content === "string") {
    return message.content;
  }
  for (const c of message.content) {
    if (c.type === "text") {
      return c.text ?? "";
    }
  }
  return "";
}

export function getMessageImages(message: RequestMessage): string[] {
  if (typeof message.content === "string") {
    return [];
  }
  const urls: string[] = [];
  for (const c of message.content) {
    if (c.type === "image_url") {
      urls.push(c.image_url?.url ?? "");
    }
  }
  return urls;
}

export function isVisionModel(model: string) {
  // Note: This is a better way using the TypeScript feature instead of `&&` or `||` (ts v5.5.0-dev.20240314 I've been using)

  const visionKeywords = ["vision", "claude-3", "gemini-1.5-pro", "gpt-4o"];

  const isGpt4Turbo =
    model.includes("gpt-4-turbo") && !model.includes("preview");

  return (
    visionKeywords.some((keyword) => model.includes(keyword)) || isGpt4Turbo
  );
}

export function useClientApi(modelName: string) {
  let model = DEFAULT_MODELS.find((value) => value.name == modelName);
  if (model?.provider?.id == "google") {
    return new ClientApi(ModelProvider.GeminiPro);
  }
  if (model?.provider?.id == "anthropic") {
    return new ClientApi(ModelProvider.Claude);
  }
  return new ClientApi(ModelProvider.GPT);
}

export function preCefMessage(query: string) {
  const result = { message: query } as { message: string; mask: string };
  if (query.startsWith("{") && query.endsWith("}")) {
    let json = JSON.parse(query) as typeof result;
    result.message = json.message;
    result.mask = json.mask;
  }
  return result;
}
