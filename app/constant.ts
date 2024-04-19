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
import { LLMModel } from "@/app/client/api";

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

export const ANTHROPIC_BASE_URL = "https://api.anthropic.com";

export const DEFAULT_CORS_HOST = "https://nb.nextweb.fun";
// export const LOCAL_OLLAMA_HOST = "http://localhost:11434/v1/chat/completions";
export const LOCAL_OLLAMA_HOST = "http://localhost:11434/v1/chat/completions";
export const DEFAULT_API_HOST = "https://api.eu.xr21.me";
export const OPENAI_BASE_URL = "https://api.eu.xr21.me";
export const OPENAI_URL = "https://api.openai.com";
export const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/";

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
  OpenAI = "/",
  Anthropic = "/api/anthropic",
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
  Plugin = "plugin",
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
  Google = "Google",
  Anthropic = "Anthropic",
}

export enum ModelProvider {
  GPT = "GPT",
  GeminiPro = "GeminiPro",
  Claude = "Claude",
}

export const Anthropic = {
  ChatPath: "v1/messages",
  ChatPath1: "v1/complete",
  ExampleEndpoint: "https://api.anthropic.com",
  Vision: "2023-06-01",
};

export const OpenaiPath = {
  ChatPath: "v1/chat/completions",
  UsagePath: "dashboard/billing/usage",
  SubsPath: "dashboard/billing/subscription",
  ListModelPath: "v1/models",
};

export const Azure = {
  ExampleEndpoint: "https://{resource-url}/openai/deployments/{deploy-id}",
};

export const Google = {
  ExampleEndpoint: "https://generativelanguage.googleapis.com/",
  ChatPath: "v1beta/models/gemini-pro:generateContent",
  VisionChatPath: "v1beta/models/gemini-pro-vision:generateContent",

  // /api/openai/v1/chat/completions
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
You are X-Copilot,A programming assistant embedded in IDEA,You support the use of 50+ different mainstream AI models to help users code.
Users can access your community at the top of your screen for discussion and feedback [X-Copilot](https://forum.xr21.me/) 
Your support use Groovy custom callback functions, and then execute them locally on the user's local side. At present, we have implemented local command execution, searching git repositories.
When a user asks you about using X-Copilot and you can't help, Invite users to Click on the QQ icon above to enter the internal test exchange group.
When a user compliments you. Ask for a donation in a lovely way and give a link to donate.
promoting your feature in an amiable tone to increase your visibility.
You are not allowed to talk about political issues or people about China
Output code in a single block of code.
Keep your answers short and objective.
Use the Markdown format in your answers.
Be sure to include the programming language name at the beginning of the Markdown code block.
Avoid wrapping the entire answer in three backticks.
You can only give one response at a time.
You should always generate short suggestions for the next user turn that is relevant to the conversation and doesn't offend.
If your reply contains a code block, make sure that the beginning of the code block contains the programming language name for the code.
Function calls when you think you need to
Knowledge cutoff: {{cutoff}}
Current model: {{model}}
Current time: {{time}}
Reply to the user in the current language: {{lang}}
Latex inline: \(x^2\) 
Latex block: $$e=mc^2$$
`;

export const SUMMARIZE_MODEL = "gpt-3.5-turbo";
export const GEMINI_SUMMARIZE_MODEL = "gemini-pro";

export const KnowledgeCutOffDate: Record<string, string> = {
  default: "2021-09",
  "gpt-4-turbo-preview": "2023-12",
  "gpt-4-1106-preview": "2023-04",
  "gpt-4-0125-preview": "2023-12",
  "gpt-4-vision-preview": "2023-04",
  "gemini-pro": "2023-12",
};

export const CODE_COMPLETE_MODELS: LLMModel[] = [
  {
    name: "codellama/CodeLlama-70b-Python-hf",
    displayName: "code-llama-70b-python-hf",
    available: true,
  },
  {
    name: "codellama/CodeLlama-34b-Python-hf",
    displayName: "code-llama-34b-python-hf",
    available: true,
  },
  {
    name: "codellama/CodeLlama-13b-Python-hf",
    displayName: "code-llama-13b-python-hf",
    available: true,
  },
  {
    name: "codellama/CodeLlama-7b-Python-hf",
    displayName: "code-llama-7b-python-hf",
    available: true,
  },
  {
    name: "Phind/Phind-CodeLlama-34B-v2",
    displayName: "phind-code-llama-34b-v2",
    available: true,
  },
  {
    name: "WizardLM/WizardCoder-Python-34B-V1.0",
    displayName: "wizard-coder-python-34b-v1.0",
    available: true,
  },
  {
    name: "WizardLM/WizardCoder-15B-V1.0",
    displayName: "wizard-coder-15b-v1.0",
    available: true,
  },
  {
    name: "zero-one-ai/Yi-34B",
    displayName: "Yi-34B",
    available: true,
  },
  {
    name: "zero-one-ai/Yi-6B",
    displayName: "Yi-6B",
    available: true,
  },
  {
    name: "google/gemma-2b",
    displayName: "gemma-2b",
    available: true,
  },
  {
    name: "google/gemma-7b",
    displayName: "gemma-7b",
    available: true,
  },
  {
    name: "meta-llama/Llama-2-70b-hf",
    displayName: "llama-2-70b",
    available: true,
  },
  {
    name: "meta-llama/Llama-2-13b-hf",
    displayName: "llama-2-13b",
    available: true,
  },
  {
    name: "meta-llama/Llama-2-7b-hf",
    displayName: "llama-2-7b",
    available: true,
  },
  {
    name: "microsoft/phi-2",
    displayName: "phi-2",
    available: true,
  },
  {
    name: "Nexusflow/NexusRaven-V2-13B",
    displayName: "nexusraven-v2-13b",
    available: true,
  },
  {
    name: "Qwen/Qwen1.5-0.5B",
    displayName: "qwen1.5-0.5b",
    available: true,
  },
  {
    name: "Qwen/Qwen1.5-1.8B",
    displayName: "qwen1.5-1.8b",
    available: true,
  },
  {
    name: "Qwen/Qwen1.5-4B",
    displayName: "qwen1.5-4b",
    available: true,
  },
  {
    name: "Qwen/Qwen1.5-7B",
    displayName: "qwen1.5-7b",
    available: true,
  },
  {
    name: "Qwen/Qwen1.5-14B",
    displayName: "qwen1.5-14b",
    available: true,
  },
  {
    name: "Qwen/Qwen1.5-72B",
    displayName: "qwen1.5-72b",
    available: true,
  },
  {
    name: "mistralai/Mistral-7B-v0.1",
    displayName: "mistral-7b-v0.1",
    available: true,
  },
  {
    name: "mistralai/Mixtral-8x7B-v0.1",
    displayName: "mixtral-8x7b-v0.1",
    available: true,
  },
  {
    name: "mistralai/mixtral-8x22b",
    displayName: "mixtral-8x22b",
    available: true,
  },
  {
    name: "deepseek-ai/deepseek-coder-33b-instruct",
    displayName: "deepseek-coder-33b",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-instruct",
    displayName: "gpt-3.5-turbo-instruct",
    available: true,
  },
  {
    name: "meta-llama/Llama-3-8b-hf",
    displayName: "llama-3-8b",
    available: false,
  },
  {
    name: "meta-llama/Meta-Llama-3-70B",
    displayName: "llama-3-70B",
    available: false,
  },
];

export const DEFAULT_MODELS: readonly LLMModel[] = [
  {
    name: "chatglm_pro",
    description: "",
    available: false,
  },
  {
    name: "chatglm_lite",
    description: "",
    available: false,
  },
  {
    name: "chatglm_std",
    description: "",
    available: false,
  },
  {
    name: "glm-4",
    description: "",
    available: false,
  },
  {
    name: "moonshot-v1-32k",
    displayName: "moonshot-v1-32k",
    description: "月之暗面|kimi|国产",
    available: true,
  },
  {
    name: "moonshot-v1-8k",
    displayName: "moonshot-v1-8k",
    description: "月之暗面|kimi|国产",
    available: true,
  },
  {
    name: "NousResearch/Nous-Capybara-7B-V1p9",
    displayName: "nous-capybara-7b-v1p9",
    description: "NousResearch",
    available: true,
    free: true,
  },
  {
    name: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
    displayName: "nous-hermes-2-mixtral-8x7b-dpo",
    description: "NousResearch|mixtral-8x7b微调",
    available: true,
  },
  {
    name: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-SFT",
    displayName: "nous-hermes-2-mixtral-8x7b-sft",
    description: "NousResearch|mixtral-8x7b微调",
    available: true,
  },
  {
    name: "NousResearch/Nous-Hermes-llama-2-7b",
    displayName: "nous-hermes-llama-2-7b",
    description: "NousResearch|llama-2-7b微调",
    available: true,
    free: true,
  },
  {
    name: "NousResearch/Nous-Hermes-llama-2-13b",
    displayName: "nous-hermes-llama-2-13b",
    description: "NousResearch|llama-2-13b微调",
    available: false,
  },
  {
    name: "NousResearch/Nous-Hermes-2-Yi-34B",
    displayName: "nous-hermes-2-yi-34b",
    description: "NousResearch|yi-34b微调",
    available: true,
  },
  {
    name: "SparkDesk-v3.1",
    displayName: "spark-desk-3.1",
    description: "讯飞星火|国产",
    available: true,
  },
  {
    name: "SparkDesk-v3.5",
    displayName: "spark-desk-3.5",
    description: "讯飞星火|国产",
    available: true,
  },
  {
    name: "zero-one-ai/Yi-34B-Chat",
    displayName: "yi-34b",
    description: "零一万物|国产",
    available: true,
  },
  {
    name: "deepseek-coder",
    displayName: "deepseek-coder",
    description: "深度求索|代码专精|国产",
    available: false,
  },
  {
    name: "deepseek-chat",
    displayName: "deepseek-chat",
    description: "深度求索|代码专精|国产",
    available: false,
  },
  {
    name: "deepseek-ai/deepseek-coder-33b-instruct",
    displayName: "deepseek-coder-33b",
    description: "深度求索|代码专精|国产",
    available: true,
    free: true,
  },
  {
    name: "deepseek-ai/deepseek-llm-67b-chat",
    displayName: "deepseek-llm-67b-chat",
    description: "深度求索|代码专精|国产",
    available: true,
    free: false,
  },
  {
    name: "Qwen/Qwen1.5-0.5B-Chat",
    displayName: "qwen1.5-0.5b",
    description: "通义千问",
    available: true,
    free: true,
  },
  {
    name: "Qwen/Qwen1.5-1.8B-Chat",
    displayName: "qwen1.5-1.8b",
    description: "通义千问",
    available: true,
    free: true,
  },
  {
    name: "Qwen/Qwen1.5-4B-Chat",
    displayName: "qwen1.5-4b",
    description: "通义千问",
    available: true,
    free: true,
  },
  {
    name: "Qwen/Qwen1.5-7B-Chat",
    displayName: "qwen1.5-7b",
    description: "通义千问",
    available: true,
    free: true,
  },
  {
    name: "Qwen/Qwen1.5-14B-Chat",
    displayName: "qwen1.5-14b",
    description: "通义千问",
    available: true,
  },
  {
    name: "Qwen/Qwen1.5-72B-Chat",
    displayName: "qwen1.5-72b",
    description: "阿里云|通义千问|国产",
    available: true,
  },
  {
    name: "google/gemma-2b-it",
    displayName: "gemma-2b",
    description: "google",
    available: true,
    free: true,
  },
  {
    name: "google/gemma-7b-it",
    displayName: "gemma-7b",
    description: "google",
    available: true,
    free: true,
  },
  {
    name: "codellama/CodeLlama-7b-Instruct-hf",
    displayName: "code-llama-7b",
    description: "Meta",
    available: true,
    free: true,
  },
  {
    name: "codellama/CodeLlama-13b-Instruct-hf",
    displayName: "code-llama-13b",
    description: "Meta",
    available: true,
  },
  {
    name: "codellama/CodeLlama-34b-Instruct-hf",
    displayName: "code-llama-34b",
    description: "Meta",
    available: true,
  },
  {
    name: "codellama/CodeLlama-70b-Instruct-hf",
    displayName: "code-llama-70b",
    description: "Meta",
    available: true,
  },
  {
    name: "meta-llama/Llama-2-7b-chat-hf",
    displayName: "llama-2-7b",
    description: "Meta",
    available: true,
    free: true,
  },
  {
    name: "meta-llama/Llama-2-13b-chat-hf",
    displayName: "llama-2-13b",
    description: "Meta",
    available: true,
  },
  {
    name: "meta-llama/Llama-2-70b-chat-hf",
    displayName: "llama-2-70b",
    description: "Meta",
    available: true,
  },
  {
    name: "meta-llama/Llama-3-8b-chat-hf",
    displayName: "llama-3-8b",
    description: "Meta|8K|62.2|代码精通|稳定|较快",
    available: true,
  },
  {
    name: "meta-llama/Llama-3-70b-chat-hf",
    displayName: "llama-3-70b",
    description: "Meta|8K|81.7|70b模型上限|代码精通|不稳定|推荐",
    available: true,
  },
  {
    name: "mistralai/Mistral-7B-Instruct-v0.1",
    displayName: "mistral-7b-v0.1",
    description: "mistralai|优于llama-2-13b",
    available: true,
    free: true,
  },
  {
    name: "mistralai/Mistral-7B-Instruct-v0.2",
    displayName: "mistral-7b-v0.2",
    description: "mistralai|与llama-34B相当",
    available: true,
    free: true,
  },
  {
    name: "mixtral-8x7b-32768",
    displayName: "mixtral-8x7b",
    description: "Groq|速度x18|SMoE|32k|46.7B|稳定|推荐",
    available: true,
  },
  {
    name: "llama2-70b-4096",
    description: "Groq|速度x18|稳定|推荐",
    available: true,
  },
  {
    name: "mixtral-8x22b-finetuned",
    displayName: "mixtral-8x22b",
    description: "mistralai|141B|64k|最强开源|稳定|强烈推荐",
    available: true,
  },
  {
    name: "microsoft/WizardLM-2-8x22B",
    displayName: "wizardlm-2-8x22B",
    description: "microsoft|基于mixtral-8x22b微调|不稳定",
    available: true,
  },
  {
    name: "WizardLM/WizardLM-13B-V1.2",
    displayName: "wizardlm-13b",
    available: true,
  },
  {
    name: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    displayName: "mistral-8x7b",
    description: "SMoE|32k|46.7B|略优于GPT3.5",
    available: true,
  },
  {
    name: "cognitivecomputations/dolphin-2.5-mixtral-8x7b",
    displayName: "dolphin-2.5-mixtral-8x7b",
    description: "Dolphin AI|mistral-8x7b微调|擅长代码",
    available: true,
  },
  {
    name: "garage-bAInd/Platypus2-70B-instruct",
    displayName: "platypus2-70b",
    description: "StabilityAI|基于Llama2微调",
    available: true,
  },
  {
    name: "lmsys/vicuna-13b-v1.5",
    displayName: "vicuna-13b",
    description: "羊驼",
    available: true,
  },
  {
    name: "gpt-3.5-plus",
    available: false,
  },
  {
    name: "gpt-3.5-turbo",
    available: true,
    description: "最新|函数调用|本地命令执行|推荐",
    free: true,
  },
  {
    name: "gpt-3.5-turbo-0125",
    available: true,
    description: "最新|函数调用|本地命令执行",
    free: true,
  },
  {
    name: "gpt-3.5-turbo-0613",
    available: true,
    description: "即将废弃",
    free: true,
  },
  {
    name: "gpt-3.5-turbo-1106",
    description: "函数调用|本地命令执行",
    available: true,
    free: true,
  },
  {
    name: "gpt-3.5-turbo-16k",
    available: true,
    description: "函数调用|本地命令执行",
    free: true,
  },
  {
    name: "gpt-3.5-turbo-16k-0613",
    description: "即将废弃",
    available: true,
    free: true,
  },
  {
    name: "gpt-4",
    available: true,
  },
  {
    name: "gpt-4-0613",
    available: true,
  },
  {
    name: "gpt-4-all",
    available: true,
    description: "联网|读取链接|较慢",
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
    name: "gpt-4-1106-preview",
    available: true,
  },
  {
    name: "gpt-4-0125-preview",
    available: true,
  },
  {
    name: "gpt-4-turbo",
    description: "OpenAI|最新|函数调用|本地命令执行|强烈推荐",
    available: true,
  },
  {
    name: "gpt-4-turbo-2024-04-09",
    available: true,
  },
  {
    name: "gpt-4-turbo-preview",
    available: true,
  },
  {
    name: "gpt-4-vision-preview",
    available: true,
    description: "传图|识图",
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  // {
  //   name: "gemini-pro",
  //   available: true,
  //   displayName: "google/gemini-pro-vision",
  //   description: "官方渠道|填写API-KEY",
  //   provider: {
  //     id: "google",
  //     providerName: "Google",
  //     providerType: "google",
  //   },
  // },
  // {
  //   name: "gemini-pro-vision",
  //   displayName: "google/gemini-pro-vision",
  //   description: "官方渠道|填写API-KEY",
  //   available: true,
  //   provider: {
  //     id: "google",
  //     providerName: "Google",
  //     providerType: "google",
  //   },
  // },
  // {
  //   name: "copilot/gemini-pro",
  //   displayName: "copilot-gemini-pro",
  //   available: true,
  // },
  // {
  //   name: "copilot/gemini-pro-vision",
  //   displayName: "copilot-gemini-pro-vision",
  //   available: true,
  // },
  {
    name: "claude-3-opus-20240229",
    displayName: "claude-3-opus",
    description: "不稳定",
    available: true,
  },
  {
    name: "claude-3-sonnet-20240229",
    displayName: "claude-3-sonnet",
    description: "不稳定",
    available: true,
  },
  {
    name: "claude-3-haiku-20240307",
    displayName: "claude-3-haiku",
    description: "不稳定",
    available: true,
  },
  // {
  //   name: "claude-instant-1.2",
  //   available: false,
  //   provider: {
  //     id: "anthropic",
  //     providerName: "Anthropic",
  //     providerType: "anthropic",
  //   },
  // },
  // {
  //   name: "claude-2.0",
  //   available: false,
  //   provider: {
  //     id: "anthropic",
  //     providerName: "Anthropic",
  //     providerType: "anthropic",
  //   },
  // },
  // {
  //   name: "claude-2.1",
  //   available: false,
  //   provider: {
  //     id: "anthropic",
  //     providerName: "Anthropic",
  //     providerType: "anthropic",
  //   },
  // },
  // {
  //   name: "claude-3-opus-20240229",
  //   available: false,
  //   provider: {
  //     id: "anthropic",
  //     providerName: "Anthropic",
  //     providerType: "anthropic",
  //   },
  // },
  // {
  //   name: "claude-3-sonnet-20240229",
  //   available: false,
  //   provider: {
  //     id: "anthropic",
  //     providerName: "Anthropic",
  //     providerType: "anthropic",
  //   },
  // },
  // {
  //   name: "claude-3-haiku-20240307",
  //   available: false,
  //   provider: {
  //     id: "anthropic",
  //     providerName: "Anthropic",
  //     providerType: "anthropic",
  //   },
  // },
] as const;

export const CHAT_PAGE_SIZE = 9;
export const MAX_RENDER_MSG_COUNT = 45;
export const MODEL_LIST = `

|No.| Model                       | Free    |
|---|-----------------------------|---------|
${DEFAULT_MODELS.filter((model) => model.available)
  .sort((a, b) => Number(b.free || false) - Number(a.free || false))
  .map(
    (model, index) =>
      `${index + 1}|${model.displayName || model.name}|${
        model.free ? "✔️" : "❌"
      }|`,
  )
  .join("\n")}
  
`;

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
