import { LLMModel } from "../client/api";
import { isMacOS } from "../utils";
import { getClientConfig } from "../config/client";
import {
  CodeStylesType,
  DEFAULT_INPUT_TEMPLATE,
  DEFAULT_MODELS,
  StoreKey,
  DEFAULT_SIDEBAR_WIDTH,
} from "../constant";
import { isIdeaPlugin } from "@/app/utils";
import { createPersistStore } from "../utils/store";

export type ModelType = (typeof DEFAULT_MODELS)[number]["name"];

export enum SubmitKey {
  Enter = "Enter",
  CtrlEnter = "Ctrl + Enter",
  ShiftEnter = "Shift + Enter",
  AltEnter = "Alt + Enter",
  MetaEnter = "Meta + Enter",
}

export enum Theme {
  Auto = "auto",
  Dark = "dark",
  Light = "light",
}

export const DEFAULT_CONFIG = {
  lastUpdate: Date.now(), // timestamp, to merge state

  submitKey: isMacOS() ? SubmitKey.MetaEnter : SubmitKey.CtrlEnter,
  avatar: "1f603",
  fontSize: 14,
  theme: Theme.Auto as Theme,
  tightBorder: isIdeaPlugin() || !!getClientConfig()?.isApp,
  sendPreviewBubble: true,
  enableAutoGenerateTitle: true,
  sidebarWidth: DEFAULT_SIDEBAR_WIDTH,
  disablePromptHint: false,
  dontShowMaskSplashScreen: true, // 创建聊天时不显示初始屏幕
  hideBuiltinMasks: false, // dont add builtin masks
  syntaxHighlighter: "vscDarkPlus" as CodeStylesType,

  customModels: "",
  models: DEFAULT_MODELS as any as LLMModel[],

  modelConfig: {
    model: "gpt-3.5-turbo-1106" as ModelType,
    temperature: 0.5,
    max_tokens: 4096,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
    sendMemory: true,
    historyMessageCount: 2,
    compressMessageLengthThreshold: 1000,
    enableInjectSystemPrompts: true,
    template: DEFAULT_INPUT_TEMPLATE,
  },
};

export type ChatConfig = typeof DEFAULT_CONFIG;

export type ModelConfig = ChatConfig["modelConfig"];

export type VoiceConfig = {
  voice: string;
  lang: string;
};

export function limitNumber(
  x: number,
  min: number,
  max: number,
  defaultValue: number,
) {
  if (isNaN(x)) {
    return defaultValue;
  }

  return Math.min(max, Math.max(min, x));
}

export function limitModel(name: string) {
  const allModels = useAppConfig.getState().models;
  return allModels.some((m) => m.name === name && m.available)
    ? name
    : "gpt-3.5-turbo-16k";
}

export const ModalConfigValidator = {
  model(x: string) {
    return x as ModelType;
  },
  max_tokens(x: number, model?: ModelType) {
    if (model == "gpt-3.5-turbo") {
      return limitNumber(x, 0, 4096, 2000);
    }
    if (model == "gpt-3.5-turbo-16k" || model == "gpt-3.5-turbo-16k-0613") {
      return limitNumber(x, 0, 16000, 4096);
    }
    return limitNumber(x, 0, 32000, 4096);
  },
  presence_penalty(x: number) {
    return limitNumber(x, -2, 2, 0);
  },
  frequency_penalty(x: number) {
    return limitNumber(x, -2, 2, 0);
  },
  temperature(x: number) {
    return limitNumber(x, 0, 1, 1);
  },
  top_p(x: number) {
    return limitNumber(x, 0, 1, 1);
  },
};

export const useAppConfig = createPersistStore(
  { ...DEFAULT_CONFIG },
  (set, get) => ({
    reset() {
      set(() => ({ ...DEFAULT_CONFIG }));
    },

    mergeModels(newModels: LLMModel[]) {
      if (!newModels || newModels.length === 0) {
        return;
      }

      const oldModels = get().models;
      const modelMap: Record<string, LLMModel> = {};

      for (const model of oldModels) {
        model.available = false;
        modelMap[model.name] = model;
      }

      for (const model of newModels) {
        model.available = true;
        modelMap[model.name] = model;
      }

      set(() => ({
        models: Object.values(modelMap),
      }));
    },

    allModels() {
      const customModels = get()
        .customModels.split(",")
        .filter((v) => !!v && v.length > 0)
        .map((m) => ({ name: m, available: true }));
      return get().models.concat(customModels);
    },
  }),
  {
    name: StoreKey.Config,
    version: 3.8,
    migrate(persistedState, version) {
      const state = persistedState as ChatConfig;

      if (version < 3.4) {
        state.modelConfig.sendMemory = true;
        state.modelConfig.historyMessageCount = 4;
        state.modelConfig.compressMessageLengthThreshold = 1000;
        state.modelConfig.frequency_penalty = 0;
        state.modelConfig.top_p = 1;
        state.modelConfig.template = DEFAULT_INPUT_TEMPLATE;
        state.dontShowMaskSplashScreen = false;
        state.hideBuiltinMasks = false;
      }

      if (version < 3.5) {
        state.customModels = "claude,claude-100k";
      }

      if (version < 3.6) {
        state.modelConfig.enableInjectSystemPrompts = true;
      }

      if (version < 3.7) {
        state.enableAutoGenerateTitle = true;
      }

      if (version < 3.8) {
        state.lastUpdate = Date.now();
      }

      return state as any;
    },
  },
);
