import { useEffect, useState } from "react";
import { showToast } from "./components/ui-lib";
import Locale from "./locales";

export function trimTopic(topic: string) {
  return topic.replace(/[，。！？”“"、,.!?]*$/, "");
}
export function isIdeaPlugin() {
  if (typeof window == "undefined") {
    return false;
  }
  return (window as any).cefQuery;
}

export function loadFunctions(): [] {
  let functionsJson: string = localStorage.getItem("functions") || "[]";
  return JSON.parse(functionsJson);
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
  message: Record<string, unknown> = { event: "replace", message: "" },
) {
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

export async function Merge(messageText: string) {
  ideaMessage({ event: "diff", message: messageText });
}

export async function Replace(messageText: string) {
  ideaMessage({ event: "replace", message: messageText });
}

export async function functionCall(messageText: string) {
  ideaMessage({ event: "function_call", message: messageText });
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
        await window.__TAURI__.fs.writeBinaryFile(
          result,
          new Uint8Array([...text].map((c) => c.charCodeAt(0))),
        );
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
    // for (let key in localStorage) {
    //   console.log(key,);
    //   if (localStorage.getItem(key) != null && key != 'app-config') {
    //     localStorage.removeItem(key)
    //   }
    // }
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
  return getUserInfo();
}
export function getUserInfo(): any {
  let userInfo = getCookie("user_info");
  return JSON.parse(userInfo);
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
