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
    { title: "免费通道", api: "/api/openai/" },
    { title: "官方直连", api: "https://api.openai.com/v1/chat/completions" },
    { title: "cloudflare_workers1", api: "https://workers1.xr21.me" },
    { title: "cloudflare_workers2", api: "https://workers2.xr21.me" },
    { title: "cloudflare_workers3", api: "https://workers3.xr21.me" },
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
