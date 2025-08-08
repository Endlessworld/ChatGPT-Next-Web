export interface CopilotModel {
  name: string;
  displayName?: string;
  available: boolean;
  description?: string;
  free?: boolean;
}

export const CODE_COMPLETE_MODELS: CopilotModel[] = [
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
    available: false,
  },
  {
    name: "zero-one-ai/Yi-6B",
    displayName: "Yi-6B",
    available: false,
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
    name: "gpt-3.5-turbo-instruct",
    displayName: "gpt-3.5-turbo-instruct",
    available: true,
  },
  {
    name: "meta-llama/Llama-3-8b-hf",
    displayName: "llama-3-8b",
    available: true,
  },
  {
    name: "meta-llama/Meta-Llama-3-70B",
    displayName: "llama-3-70B",
    available: true,
  },
];

export const DEFAULT_MODELS: readonly CopilotModel[] = [
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
    description: "智谱清言",
    available: false,
  },
  {
    name: "moonshot-v1-128k",
    displayName: "moonshot-v1-128k",
    description: "月之暗面|kimi|国产",
    available: true,
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
  // {
  //   name: "NousResearch/Nous-Capybara-7B-V1p9",
  //   displayName: "nous-capybara-7b-v1p9",
  //   description: "NousResearch",
  //   available: true,
  //   free: true,
  // },
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
  // {
  //   name: "NousResearch/Nous-Hermes-llama-2-7b",
  //   displayName: "nous-hermes-llama-2-7b",
  //   description: "NousResearch|llama-2-7b微调",
  //   available: true,
  //   free: true,
  // },
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
    available: false,
  },
  {
    name: "SparkDesk-v3.5",
    displayName: "spark-desk-3.5",
    description: "讯飞星火|国产",
    available: false,
  },
  {
    name: "zero-one-ai/Yi-34B-Chat",
    displayName: "yi-34b",
    description: "零一万物|国产",
    available: true,
  },
  {
    name: "deepseek-chat",
    displayName: "deepseek-chat",
    description: "深度求索|236B|32k|稳定|强烈推荐",
    available: true,
    free: true,
  },
  {
    name: "deepseek-coder",
    displayName: "deepseek-coder",
    description: "深度求索|官方版|16K",
    available: true,
    free: true,
  },
  {
    name: "ERNIE-Speed-128K",
    displayName: "ERNIE-Speed-128K",
    available: false,
  },
  {
    name: "ERNIE-Speed-8K",
    displayName: "ERNIE-Speed-8K",
    available: false,
  },
  {
    name: "ERNIE-Lite-8K-0922",
    displayName: "ERNIE-Lite-8K-0922",
    available: false,
  },
  {
    name: "ERNIE-Lite-8K-0308",
    displayName: "ERNIE-Lite-8K-0308",
    available: false,
  },
  {
    name: "ERNIE-Speed-8K",
    displayName: "ERNIE-Speed-8K",
    available: false,
  },
  {
    name: "ERNIE-Tiny-8K",
    displayName: "ERNIE-Tiny-8K",
    available: false,
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
    name: "Qwen/Qwen2.5-Coder-32B-Instruct",
    displayName: "qwen2.5-coder",
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
    description: "阿里云|通义千问",
    available: true,
  },
  {
    name: "Qwen/Qwen1.5-110B-Chat",
    displayName: "qwen1.5-110b",
    description: "阿里云|通义千问",
    available: true,
  },
  {
    name: "Qwen/Qwen2-72B-Instruct",
    displayName: "qwen2-72B",
    description: "阿里云|通义千问",
    available: true,
  },
  {
    name: "Snowflake/snowflake-arctic-instruct",
    displayName: "snowflake-arctic",
    description: "Snowflake|MoE|480B|128×3.66B",
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
    name: "google/gemma-2-9b-it",
    displayName: "gemma-2-9b",
    description: "google",
    available: true,
  },
  {
    name: "google/gemma-2-27b-it",
    displayName: "gemma-2-27b",
    description: "google",
    available: true,
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
    available: false,
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
    name: "meta-llama/Meta-Llama-3-70B-Instruct-Lite",
    displayName: "llama-3-70b-lite",
    description: "Meta",
    available: true,
  },
  {
    name: "meta-llama/Meta-Llama-3-70B-Instruct-Turbo",
    displayName: "llama-3-70b-turbo",
    description: "Meta",
    available: true,
  },
  {
    name: "meta-llama/Meta-Llama-3-8B-Instruct-Lite",
    displayName: "llama-3-8b-lite",
    description: "Meta",
    available: true,
  },
  {
    name: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
    displayName: "llama-3-8b-turbo",
    description: "Meta",
    available: true,
  },
  {
    name: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    displayName: "llama-3.1-8b-turbo",
    description: "Meta",
    available: true,
  },
  {
    name: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
    displayName: "llama-3.1-70b-turbo",
    description: "Meta",
    available: true,
  },
  {
    name: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
    displayName: "llama-3.1-405b-turbo",
    description: "Meta|7月最强开源",
    available: true,
  },
  {
    name: "meta-llama/Llama-3-8b-chat-hf",
    displayName: "llama-3-8b",
    description: "Meta|8K|62.2",
    available: true,
  },
  {
    name: "meta-llama/Llama-3-70b-chat-hf",
    displayName: "llama-3-70b",
    description: "Meta|8K|81.7|代码精通|稳定|推荐",
    available: true,
  },
  {
    name: "meta-llama/Llama-Vision-Free",
    displayName: "Llama-Vision-Free",
    description: "Meta|推荐",
    available: true,
  },
  {
    name: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
    displayName: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
    description: "Meta|推荐",
    available: true,
  },
  {
    name: "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
    displayName: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
    description: "Meta|稳定|推荐",
    available: true,
  },
  // {
  //   name: "llama3-70b-8192",
  //   displayName: "llama3-70b-8192",
  //   description: "Groq|8K|81.7|代码精通|稳定|推荐|速度最快",
  //   available: true,
  // },
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
  // {
  //   name: "llama2-70b-4096",
  //   description: "Groq|速度x18|稳定|推荐",
  //   available: false,
  // },
  // {
  //   name: "mixtral-8x22b-finetuned",
  //   displayName: "mixtral-8x22b",
  //   description: "mistralai|141B|64k|稳定|推荐",
  //   available: true,
  // },
  // {
  //   name: "microsoft/WizardLM-2-8x22B",
  //   displayName: "wizardlm-2-8x22B",
  //   description: "microsoft|基于mixtral-8x22b微调",
  //   available: true,
  // },
  {
    name: "WizardLM/WizardLM-13B-V1.2",
    displayName: "wizardlm-13b",
    available: false,
  },
  {
    name: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    displayName: "mistral-8x7b",
    description: "SMoE|32k|46.7B|略优于GPT3.5",
    available: true,
  },
  {
    name: "databricks/dbrx-instruct",
    displayName: "dbrx-instruct",
    description: "Databricks|32k|132B",
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
    available: false,
  },
  {
    name: "gpt-4o-mini",
    description: "OpenAI|最新",
    available: true,
    free: true,
  },
  {
    name: "chatgpt-4o-latest",
    available: true,
    description: "latest",
  },
  {
    name: "gpt-4o-plus",
    available: true,
    description: "plus",
  },
  {
    name: "dall-e-3",
    available: true,
    description: "plus",
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
    description: "不稳定|略慢",
    available: true,
  },
  {
    name: "claude-3-sonnet-20240229",
    displayName: "claude-3-sonnet",
    description: "不稳定|略慢",
    available: true,
  },
  {
    name: "claude-3-haiku-20240307",
    displayName: "claude-3-haiku",
    description: "不稳定|略慢",
    available: true,
  },
  // {
  //   name: "claude-3.5-sonnet-20240620",
  //   displayName: "claude-3.5-sonnet-20240620",
  //   description: "Claude|最新",
  //   available: false,
  // },
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
      `${index + 1}|${model.name || model.name}|${model.free ? "✔️" : "❌"}|`,
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
