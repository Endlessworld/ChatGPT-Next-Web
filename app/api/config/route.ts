import { NextResponse } from "next/server";

import { getServerSideConfig } from "../../config/server";

const serverConfig = getServerSideConfig();

// Danger! Don not write any secret value here!
// 警告！不要在这里写入任何敏感信息！
const DANGER_CONFIG = {
  needCode: serverConfig.needCode,
  hideUserApiKey: serverConfig.hideUserApiKey,
  disableGPT4: serverConfig.disableGPT4,
  hideBalanceQuery: serverConfig.hideBalanceQuery,
  workers: [
    {
      title: "订阅通道-亚洲",
      api: "https://api.asia.xr21.me",
      checked: true,
    },
    {
      title: "订阅通道-欧洲",
      api: "https://api.eu.xr21.me",
      checked: false,
    },
    {
      title: "订阅通道-非洲",
      api: "https://api.africa.xr21.me",
      checked: false,
    },
    {
      title: "订阅通道-北美",
      api: "https://api.na.xr21.me",
      checked: false,
    },
    {
      title: "订阅通道-南美",
      api: "https://api.sa.xr21.me",
      checked: false,
    },
    {
      title: "订阅通道-澳洲",
      api: "https://api.oc.xr21.me",
      checked: false,
    },
    {
      title: "官方直连",
      api: "https://api.openai.com/",
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
