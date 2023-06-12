import { useEffect, useState } from "react";
import { showToast } from "./components/ui-lib";
import Locale from "./locales";

export function trimTopic(topic: string) {
  return topic.replace(/[，。！？”“"、,.!?]*$/, "");
}
export function projectContext() {
  let content = `在单个代码块中输出代码
            保持你的回答简短和客观。
            在你的回答中使用 Markdown 格式。
            确保在 Markdown 代码块的开头包含编程语言名称。
            避免用三个反引号包装整个回答。 
            你每次只能给出一个回复。
            你应该始终生成与对话相关且不冒犯的下一个用户回合的简短建议。`;

  if (isIdeaPlugin()) {
    const projectContext = localStorage.getItem("project-context");
    if (projectContext) {
      let enableContext = JSON.parse(projectContext).enableContext;
      let projectContent = JSON.parse(projectContext).content;
      if (enableContext && projectContent) {
        return content.concat(`
          以下是我项目的配置或代码片段，你需要以此作为每个回答的参考依据:
          ${projectContent}`);
      }
    }
  }
  return content;
}
export function isIdeaPlugin() {
  return (window as any).cefQuery;
}

export async function ideaMessage(
  message: Record<string, unknown> = { event: "replace", message: "" },
) {
  console.log((window as any).cefQuery);
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
            showToast("自动回写成功");
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

export async function Merge(messageText: string) {
  ideaMessage({ event: "diff", message: messageText });
}

export async function Replace(messageText: string) {
  ideaMessage({ event: "replace", message: messageText });
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
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

export function downloadAs(text: string, filename: string) {
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
    // del storage
    localStorage.clear();
    sessionStorage.clear();
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
  let userInfo = getCookie("user_info");
  return JSON.parse(userInfo);
}
export function useUserAvatar(): any {
  let userInfo = getCookie("user_info");
  return JSON.parse(userInfo).custom_avatar;
}
export function getCookie(name: string | any[]) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
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
  console.log(content);
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
