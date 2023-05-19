import { NextRequest } from "next/server";
import { getServerSideConfig } from "../config/server";
import md5 from "spark-md5";
import { ACCESS_CODE_PREFIX } from "../constant";

const REQUEST_LIMIT = 10;
const REQUEST_MAX_LIMIT = 30;
const REQUEST_LIMIT_TIME = 60 * 60 * 1000; // 将时间转换为毫秒
const ipRequests = new Map<string, { count: number; lastTimestamp: number }>();

function getIP(req: NextRequest) {
  let ip = req.ip ?? req.headers.get("x-real-ip");
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").at(0) ?? "";
  }
  return typeof ip === "string" ? ip : "";
}

function parseApiKey(bearToken: string) {
  const token = bearToken.trim().replaceAll("Bearer ", "").trim();
  const isOpenAiKey = !token.startsWith(ACCESS_CODE_PREFIX);

  return {
    accessCode: isOpenAiKey ? "" : token.slice(ACCESS_CODE_PREFIX.length),
    apiKey: isOpenAiKey ? token : "",
  };
}

/**
 * 鉴权函数
 *
 * @param req Next.js API 路由处理函数的 req 参数
 * @returns 如果未通过鉴权，则返回一个包含 error、needAccessCode 和 msg 属性的对象；否则返回一个只包含 error 属性的对象
 */
export function auth(req: NextRequest) {
  // 获取请求头中 Authorization 字段的值，如果不存在则置为空字符串
  const authToken = req.headers.get("Authorization") ?? "";
  // 解析 API 密钥
  const { accessCode, apiKey: token } = parseApiKey(authToken);
  // 对 accessCode 进行 MD5 哈希，并去除首尾空格，用于和配置文件中的哈希值比较
  const hashedCode = md5.hash(accessCode ?? "").trim();
  const remoteIp = getIP(req);

  // 输出调试信息
  const serverConfig = getServerSideConfig();
  console.log("[Auth] allowed hashed codes: ", [...serverConfig.codes]);
  console.log("[Auth] got access code:", accessCode);
  console.log("[Auth] hashed access code:", hashedCode);
  console.log("[User IP] ", remoteIp);
  console.log("[Time] ", new Date().toLocaleString());
  console.log("ipRequests ", ipRequests);

  // 如果ipRequest字典中没有该IP地址的记录，则在字典中添加该记录
  if (!ipRequests.has(remoteIp)) {
    ipRequests.set(remoteIp, { count: 0, lastTimestamp: 0 });
  }

  // 获取该IP地址的记录
  const requestRecord = ipRequests.get(remoteIp)!;

  // 获取当前时间戳
  const currentTimestamp = Date.now();

  // 如果当前时间与最后一个请求的时间戳之差大于30秒，则将计数器重置为0，并将最后一个请求的时间更新为当前时间
  if (currentTimestamp - requestRecord.lastTimestamp > REQUEST_LIMIT_TIME) {
    requestRecord.count = 0;
    requestRecord.lastTimestamp = currentTimestamp;
  }

  // 将请求计数器加1，并更新最后一个请求的时间
  requestRecord.count++;
  requestRecord.lastTimestamp = currentTimestamp;

  // 如果计数器超过了请求数限制，则返回 429 Too Many Requests 响应
  console.log(requestRecord.count > REQUEST_LIMIT);

  // 如果需要 Access Code 并且用户没有提供 Access Code 或提供的 Access Code 不在允许列表中，则返回错误响应
  if (serverConfig.needCode && !serverConfig.codes.has(hashedCode) && !token) {
    if (requestRecord.count > REQUEST_LIMIT) {
      return {
        error: true,
        needAccessCode: true,
        msg: "当前为免费通道，暂时提供每小时10次/ip免费体验次数。继续使用请以访问密码解锁至每小时30次/ip，请前往设置页面填写您的 Access Code 或 OpenAI API Key",
        status: 401,
      };
    }
  } else if (serverConfig.needCode && serverConfig.codes.has(hashedCode)) {
    if (requestRecord.count > REQUEST_MAX_LIMIT) {
      return {
        error: true,
        needAccessCode: true,
        msg: "当前为免费通道，暂时提供最高每小时30次/ip免费请求次数。休息一下再来吧~。 若要继续使用 请前往设置页面填写您的 OpenAI API Key",
        status: 401,
      };
    }
  }
  // return {error: true, msg: "Too many requests",status: 429};
  // 如果用户没有提供 API Key，且系统配置了默认 API Key，则使用系统默认 API Key
  if (!token) {
    const apiKey = serverConfig.apiKey;

    if (apiKey) {
      console.log("[Auth] use system api key");
      req.headers.set("Authorization", `Bearer ${apiKey}`);
    } else {
      console.log("[Auth] admin did not provide an api key");
      return {
        error: true,
        msg: "空白的 API Key",
        status: 401,
      };
    }
  } else {
    console.log("[Auth] use user api key");
  }

  return {
    error: false,
  };
}
