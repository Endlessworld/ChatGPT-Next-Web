import { NextResponse } from "next/server";

import { getServerSideConfig } from "../../config/server";

const serverConfig = getServerSideConfig();

// Danger! Don not write any secret value here!
// 警告！不要在这里写入任何敏感信息！
const DANGER_CONFIG = {
  needCode: serverConfig.needCode,
  hideUserApiKey: serverConfig.hideUserApiKey,
  enableGPT4: serverConfig.enableGPT4,
  workers: [
    {
      title: "免费通道",
      api: "/api/openai/",
      description: "需要填写访问密码，关注公众号或注册社区账号即可获取访问密码",
      checked: true,
    },
    {
      title: "官方直连",
      api: "https://api.openai.com/",
      description: "需要填写访问apiKey、受地域限制",
      checked: false,
    },
    {
      title: "cloudflare_workers1",
      api: "https://workers1.xr21.me",
      description: "需要填写访问apiKey、无地域限制",
      checked: false,
    },
    {
      title: "cloudflare_workers2",
      api: "https://workers2.xr21.me",
      description: "需要填写访问apiKey、无地域限制",
      checked: false,
    },
    {
      title: "cloudflare_workers3",
      api: "https://workers3.xr21.me",
      description: "需要填写访问apiKey、无地域限制",
      checked: false,
    },
    {
      title: "go-proxy",
      api: "http://localhost:8080/api/proxy/",
      description: "需要填写访问apiKey、无地域限制",
      checked: false,
    },
  ],
};

declare global {
  type DangerConfig = typeof DANGER_CONFIG;
}
async function handle() {
  return NextResponse.json(DANGER_CONFIG);
}

export const GET = handle;
export const POST = handle;

export const runtime = "edge";
