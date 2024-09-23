import { createPersistStore } from "../utils/store";
import { StoreKey } from "@/app/constant";

export const DEFAULT_COPILOT_STATE = {
  initialized: false,
  isIde: false,
  is_encode: false,
  idea_version: "",
  idea_api_version: "",
  java_vendor: "",
  x_copilot_plugin_version: "",
  os_name: "",
  os_version: "",
  os_arch: "",
  java_version: "",
  java_runtime_version: "",
  is_light: true,
  enable_context_aware: false,
  context_aware_content: {} as Map<string, string>,
};
export const useCopilotStore = createPersistStore(
  { ...DEFAULT_COPILOT_STATE },

  (set, get) => ({}),
  {
    name: StoreKey.Copilot,
    version: 1,
    migrate(persistedState, version) {
      return persistedState as any;
    },
  },
);
