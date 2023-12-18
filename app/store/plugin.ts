import { createPersistStore } from "@/app/utils/store";
import { StoreKey } from "@/app/constant";

export const DEFAULT_CLIENT_INFO = {
  is_encode: false,
  is_plugin: false,
  os_name: "",
  os_arch: "",
  os_version: "",
  idea_version: "",
  idea_api_version: "",
  java_vendor: "",
  java_version: "",
  java_runtime_version: "",
  x_copilot_plugin_version: "",
};
export type ClientInfo = typeof DEFAULT_CLIENT_INFO;
export const useClientInfoStore = createPersistStore(
  { ...DEFAULT_CLIENT_INFO },
  (set, get) => ({
    reset() {
      set(() => ({ ...DEFAULT_CLIENT_INFO }));
    },
    updateClientInfo: (info: ClientInfo) => {
      get().update((config) => {
        config.is_encode = true;
        config.is_plugin = true;
        config.os_name = info.os_name;
        config.os_arch = info.os_name;
        config.os_version = info.os_name;
        config.java_vendor = info.os_name;
        config.java_version = info.os_name;
        config.java_runtime_version = info.os_name;
        config.idea_version = info.idea_version;
        config.idea_api_version = info.idea_api_version;
        config.x_copilot_plugin_version = info.x_copilot_plugin_version;
      });
      get().markUpdate();
      console.log(get());
    },
  }),
  {
    name: StoreKey.Plugin,
    version: 1.0,
    migrate(persistedState, version) {
      return persistedState as any;
    },
  },
);
