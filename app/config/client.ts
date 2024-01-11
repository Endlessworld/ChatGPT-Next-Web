import { BuildConfig, getBuildConfig } from "./build";
function queryMeta(key: string, defaultValue?: string): string {
  let ret: string = "{}";
  if (typeof document !== "undefined" && document) {
    const meta = document.head.querySelector(
      `meta[name='${key}']`,
    ) as HTMLMetaElement;
    ret = meta?.content ?? "";
  } else {
    ret = defaultValue ?? "";
  }

  return ret;
}

export function getClientConfig() {
  if (typeof document !== undefined) {
    // console.log('getClientConfig document',typeof document !== undefined,queryMeta("config"))
    try {
      return JSON.parse(queryMeta("config")) as BuildConfig;
    } catch (e) {
      // console.log('getClientConfig process',getBuildConfig())
      return getBuildConfig();
    }
  }

  if (typeof process !== undefined && process) {
    // console.log('getClientConfig process',getBuildConfig())
    return getBuildConfig();
  }
}
export const runtime = "edge";
