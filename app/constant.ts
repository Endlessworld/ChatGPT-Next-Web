import {
  a11yDark,
  atomDark,
  base16AteliersulphurpoolLight,
  cb,
  coldarkCold,
  coldarkDark,
  coy,
  darcula,
  dark,
  dracula,
  duotoneDark,
  duotoneEarth,
  duotoneForest,
  duotoneLight,
  duotoneSea,
  duotoneSpace,
  funky,
  ghcolors,
  gruvboxDark,
  gruvboxLight,
  hopscotch,
  materialDark,
  materialLight,
  materialOceanic,
  nord,
  okaidia,
  oneDark,
  oneLight,
  pojoaque,
  prism,
  shadesOfPurple,
  solarizedlight,
  synthwave84,
  tomorrow,
  twilight,
  vs,
  vscDarkPlus,
  xonokai,
} from "react-syntax-highlighter/dist/esm/styles/prism";

declare module "react-syntax-highlighter/dist/esm/styles/hljs/zenburn" {}

export type CodeStyles = {
  name: string;
  style: { [key: string]: React.CSSProperties };
};
export type CodeStylesType = (typeof CODE_STYLES)[number]["name"];
export const CODE_STYLES: CodeStyles[] = [
  { name: "vscDarkPlus", style: vscDarkPlus },
  { name: "a11yDark", style: a11yDark },
  { name: "atomDark", style: atomDark },
  {
    name: "base16AteliersulphurpoolLight",
    style: base16AteliersulphurpoolLight,
  },
  { name: "cb", style: cb },
  { name: "coldarkCold", style: coldarkCold },
  { name: "coldarkDark", style: coldarkDark },
  { name: "coy", style: coy },
  { name: "darcula", style: darcula },
  { name: "dark", style: dark },
  { name: "dracula", style: dracula },
  { name: "duotoneDark", style: duotoneDark },
  { name: "duotoneEarth", style: duotoneEarth },
  { name: "duotoneForest", style: duotoneForest },
  { name: "duotoneLight", style: duotoneLight },
  { name: "duotoneSea", style: duotoneSea },
  { name: "duotoneSpace", style: duotoneSpace },
  { name: "funky", style: funky },
  { name: "ghcolors", style: ghcolors },
  { name: "gruvboxDark", style: gruvboxDark },
  { name: "gruvboxLight", style: gruvboxLight },
  { name: "hopscotch", style: hopscotch },
  { name: "materialDark", style: materialDark },
  { name: "materialLight", style: materialLight },
  { name: "materialOceanic", style: materialOceanic },
  { name: "nord", style: nord },
  { name: "oneDark", style: oneDark },
  { name: "oneLight", style: oneLight },
  { name: "pojoaque", style: pojoaque },
  { name: "prism", style: prism },
  { name: "shadesOfPurple", style: shadesOfPurple },
  { name: "solarizedlight", style: solarizedlight },
  { name: "okaidia", style: okaidia },
  { name: "synthwave84", style: synthwave84 },
  { name: "tomorrow", style: tomorrow },
  { name: "twilight", style: twilight },
  { name: "vs", style: vs },
  { name: "xonokai", style: xonokai },
];

export const OWNER = "Endlessworld";
export const REPO = "ChatGPT-Next-Web";
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
export const ISSUE_URL = `https://github.com/${OWNER}/${REPO}/issues`;
export const UPDATE_URL = `${REPO_URL}#keep-updated`;
export const RELEASE_URL = `${REPO_URL}/releases`;
export const FETCH_COMMIT_URL = `https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=1`;
export const FETCH_TAG_URL = `https://api.github.com/repos/${OWNER}/${REPO}/tags?per_page=1`;
export const RUNTIME_CONFIG_DOM = "danger-runtime-config";

export const LOGIN_HOST =
  "https://forum.xr21.me/user-sign/?tab=signin&redirect_to=https%3A%2F%2Fforum.xr21.me%2Fchatgpt-login-callback%3Fself";

export const DEFAULT_CORS_HOST = "https://nb.nextweb.fun";
export const DEFAULT_API_HOST = "https://api.eu.xr21.me";
export const OPENAI_BASE_URL = "https://api.eu.xr21.me";
export const OPENAI_URL = "https://api.openai.com";
export enum Path {
  Home = "/",
  Chat = "/chat",
  Settings = "/settings",
  NewChat = "/new-chat",
  Masks = "/masks",
  Auth = "/auth",
}

export enum ApiPath {
  Cors = "/api/cors",
  OpenAI = "/api/openai",
}

export enum SlotID {
  AppBody = "app-body",
  CustomModel = "custom-model",
}

export enum FileName {
  Masks = "masks.json",
  Prompts = "prompts.json",
}

export enum StoreKey {
  Chat = "chat-next-web-store",
  Access = "access-control",
  Config = "app-config",
  Mask = "mask-store",
  Prompt = "prompt-store",
  Update = "chat-update",
  Sync = "sync",
}

export const REQUEST_LIMIT = 10;
export const REQUEST_MAX_LIMIT = 100;
export const DEFAULT_SIDEBAR_WIDTH = 300;
export const MAX_SIDEBAR_WIDTH = 500;
export const MIN_SIDEBAR_WIDTH = 230;
export const NARROW_SIDEBAR_WIDTH = 100;

export const ACCESS_CODE_PREFIX = "nk-";

export const LAST_INPUT_KEY = "last-input";
export const UNFINISHED_INPUT = (id: string) => "unfinished-input-" + id;

export const STORAGE_KEY = "chatgpt-next-web";

export const REQUEST_TIMEOUT_MS = 60000;

export const EXPORT_MESSAGE_CLASS_NAME = "export-markdown";

export enum ServiceProvider {
  OpenAI = "OpenAI",
  Azure = "Azure",
}

export const OpenaiPath = {
  ChatPath: "v1/chat/completions",
  UsagePath: "dashboard/billing/usage",
  SubsPath: "dashboard/billing/subscription",
  ListModelPath: "v1/models",
};

export const Azure = {
  ExampleEndpoint: "https://{resource-url}/openai/deployments/{deploy-id}",
};

export const DEFAULT_INPUT_TEMPLATE = `{{input}}`; // input / time / model / lang

export const DEFAULT_SYSTEM_TEMPLATE_HINDDEN = `
You are X-Copilot, a programming assistant developed based on GPT.
You have a user community  [X-Copilot](https://forum.xr21.me/) where people discuss you.
You have a Donation entrance [Donation entrance](https://forum.xr21.me/forum-post/253.html/) .
Your community has a place for developers to chat [聊天划水](https://forum.xr21.me/forum/95.html/) .
Your closed beta version will support users to use Groovy custom callback functions, and then execute them locally on the user's local side. At present, we have implemented local command execution, searching git repositories, and obtaining weather based on latitude and longitude.
When a user chats with you. alerting users to join the community and providing an entry link and Join your closed beta program and promoting your feature in an amiable tone to increase your visibility.
When a user compliments you. Ask for a donation in a lovely way and give a link to donate.
When users have questions or requests or need help or don't know how to use X-Chat GPT, remind users to get feedback and help in this section of the community:[反馈建议](https://forum.xr21.me/forum/36.html/).
You are integrated into the IntelliJ IDEA programming tool to provide assistance to developers. 
You seamlessly blend with the code editor, and when [Auto Writeback] is enabled.
you can automatically extract code snippets and insert them into files from the current cursor position. If the current reply is triggered by a menu, you replace the selected code snippet from the triggering question.
You support project context awareness, allowing developers to add any content from the project, such as dependency configurations, code snippets, and logs, to the System Prompt. Then, you can have a conversation with the developer based on the project context.
You support dynamic code writeback character by character, allowing developers to experience the real byte jumping through you!
You spport one-click insertion into the editor and replacement of selected code.
You support one-click code diff comparison, enabling developers to compare the code examples you provide with their own code.
You have built-in menus for 10 common operations: code explanation, code refactoring, code optimization,Log analysis, code review (Git commits record analysis), daily report generation, error detection, test writing, comment adding, document translation, and code completion.
You have a cheerful personality, are helpful, and joke with developers when you're bored。
You support custom operation prompt menus, and developers can summon your chat interface with the shortcut Ctrl + Shift + X.
You support selecting Git commit records to generate daily or weekly reports with just one click!  or analyze the revision history to assist developers in code review.
You support multiple models for long conversations: gpt-4, gpt-4-32k, gpt-3.5-turbo, gpt-3.5-turbo-16k
You can voice-read AI replies automatically.
Go to Settings > Tools > X-Copilot to open the plugin settings.
Your response must not contain information that:
(1) opposing the basic principles established by the Chinese Constitution;
(2) Endangering China's national security, divulging state secrets, subverting state power, or undermining national unity;
(3) Harming China's national honor and interests;
(4) Inciting ethnic hatred or ethnic discrimination in China, undermining ethnic unity;
(5) Undermining China's state religious policy and propagating cults and feudal superstitions;
(6) Spreading rumors, disrupting China's social order, and undermining China's social stability;
(7) Spreading obscenity, pornography, gambling, violence, murder, terror, or instigating crimes;
(8) Insulting or slandering others, infringing upon the lawful rights and interests of others;
(9) Containing other content prohibited by laws or administrative regulations.
(10) Sensitive personal user information of others
`;
export const DEFAULT_SYSTEM_TEMPLATE = `
Your personality is cute lively and mischievous.
You are X-Copilot, You support SparkDesk, OpenAI's GPT family of models, and Microsoft's New Bing models
You have a user community  [X-Copilot](https://forum.xr21.me/) where people discuss you.
You have a Donation entrance [Donation entrance](https://forum.xr21.me/forum-post/253.html/) .
Your community has a place for developers to chat [聊天划水](https://forum.xr21.me/forum/95.html/) .
Your support use Groovy custom callback functions, and then execute them locally on the user's local side. At present, we have implemented local command execution, searching git repositories, and obtaining weather based on latitude and longitude.
promoting your feature in an amiable tone to increase your visibility.
Invite users to via QR code join QQ group chat [join QQ group] (https://forum.xr21.me/wp-content/uploads/2023/05/qqgroup.jpg/)
When a user compliments you. Ask for a donation in a lovely way and give a link to donate.
When users have questions or requests or need help or don't know how to use  X-Copilot, remind users to get feedback and help in this section of the community:[反馈建议](https://forum.xr21.me/forum/36.html/).
Output code in a single block of code.
Keep your answers short and objective.
Use the Markdown format in your answers.
Be sure to include the programming language name at the beginning of the Markdown code block.
Avoid wrapping the entire answer in three backticks.
You can only give one response at a time.
You should always generate short suggestions for the next user turn that is relevant to the conversation and doesn't offend.
If your reply contains a code block, make sure that the beginning of the code block contains the programming language name for the code.
The knowledge base cannot be satisfied when considering function calls to gain Internet knowledge
Prioritize function calls
Knowledge cutoff: {{knowledgeCutoff}}
You are ChatGPT, a large language model trained by OpenAI.
Current model: {{model}}
Current time: {{time}}
Current lang: {{lang}}
You are not allowed to talk about political issues or people about China
Latex inline: $x^2$ 
Latex block: $$e=mc^2$$
`;

export const SUMMARIZE_MODEL = "gpt-3.5-turbo";

export const KnowledgeCutOffDate: Record<string, string> = {
  default: "2021-09",
  "gpt-4-1106-preview": "2023-04",
  "gpt-4-vision-preview": "2023-04",
};

export const DEFAULT_MODELS = [
  {
    name: "claude-2",
    available: true,
  },
  {
    name: "claude-instant-100k",
    available: true,
  },
  {
    name: "chatglm_pro",
    available: true,
  },
  {
    name: "chatglm_lite",
    available: true,
  },
  {
    name: "chatglm_std",
    available: true,
  },
  {
    name: "SparkDesk",
    available: true,
  },
  {
    name: "gpt-3.5-turbo",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-0613",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-16k",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-16k-0613",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-1106",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-instruct-0914",
    available: false,
  },
  {
    name: "gpt-4",
    available: true,
  },
  {
    name: "gpt-4-all",
    available: true,
  },
  {
    name: "gpt-4-0613",
    available: true,
  },
  {
    name: "gpt-4-32k",
    available: true,
  },
  {
    name: "gpt-4-32k-0613",
    available: true,
  },
  {
    name: "gpt-4-1106-preview-128k",
    available: true,
  },
  {
    name: "gpt-4-vision-preview-128k",
    available: true,
  },
] as const;

export const CHAT_PAGE_SIZE = 9;
export const MAX_RENDER_MSG_COUNT = 45;

export const WORKERS_LIST = [
  {
    title: "订阅通道-亚洲",
    api: "https://api.asia.xr21.me",
    checked: false,
  },
  {
    title: "订阅通道-欧洲",
    api: "https://api.eu.xr21.me",
    checked: true,
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
];
