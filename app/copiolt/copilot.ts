import { showToast } from "@/app/components/ui-lib";

export function isIdeaPlugin() {
  if (typeof window == "undefined") {
    return false;
  }
  return (window as any).cefQuery;
}

// 导出一个函数loadFunctions，该函数会返回一个数组
export function loadFunctions(): any[] | undefined {
  // 从localStorage中获取名为"functions"的键所对应的值（默认值为"[]"）
  let useAgent = localStorage.getItem("useAgent");
  let functionsJson: string = localStorage.getItem("functions") || "[]";
  // 使用JSON.parse将字符串转化为数组类型
  if (useAgent) {
    localStorage.removeItem("useAgent");
    return JSON.parse(functionsJson).filter(
      (e: { name: string | null }) => e.name == useAgent,
    );
  }
  return undefined;
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

export function useUserAvatar(): string {
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

export async function ideaMessage(
  message: {
    event: string;
    message?: string;
    session?: string;
    callback?: (response: any) => void;
  } = {
    event: "replace",
    message: "",
    session: "",
    callback: (response: any) => {},
  },
) {
  if (!message.event) {
    return;
  }
  const callback: (response: any) => void =
    message.callback || ((response: any) => {});
  try {
    if ((window as any).cefQuery) {
      console.log("cefQuery", message);
      (window as any).cefQuery({
        request: JSON.stringify(message),
        onSuccess: (cefResponse: any) => {
          console.log("cefResponse", cefResponse);
          if (message.event === "replace") {
            // showToast(Locale.Replace.Success);
          }
          if (message.event === "diff") {
            // showToast(Locale.Merge.Success);
          }
          if (message.event === "auto") {
            // showToast("自动回写成功");
          }
          if (message.event === "function_call") {
            showToast("tool call success");
          }
          callback(cefResponse);
        },
        onFailure: (error_code: any, error_message: any) => {
          showToast("tool call failed " + error_message);
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
  return new Promise((resolve) => {
    ideaMessage({
      event: "function_call",
      message: messageText,
      session: session,
      callback: (response: any) => {
        resolve({
          status: 200,
          data: {
            content: response,
          },
        });
      },
    });
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

export const runtime = "browser";
