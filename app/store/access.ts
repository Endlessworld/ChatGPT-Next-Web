import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_API_HOST,
  DEFAULT_MODELS,
  StoreKey,
  WORKERS_LIST,
} from "../constant";
import { getHeaders } from "../client/api";
import { getClientConfig } from "../config/client";

export interface worker {
  title: string;
  api: string;
  checked: boolean;
}
export interface AccessControlStore {
  accessCode: string;
  token: string;

  enableAOAI: boolean;
  azureDeployName: string;

  needCode: boolean;
  hideUserApiKey: boolean;
  openaiUrl: string;
  workers: worker[];
  updateWorkers: (_: worker[]) => void;
  updateOpenaiUrl: (_: string) => void;
  hideBalanceQuery: boolean;
  disableGPT4: boolean;

  updateToken: (_: string) => void;
  updateCode: (_: string) => void;
  updateDeployName: (_: string) => void;
  switchAOAI: (_: boolean) => void;
  updateOpenAiUrl: (_: string) => void;
  enabledAccessControl: () => boolean;
  isAuthorized: () => boolean;
  fetch: () => void;
}

let fetchState = 0; // 0 not fetch, 1 fetching, 2 done

const DEFAULT_OPENAI_URL = DEFAULT_API_HOST;
console.log("[API] default openai url", DEFAULT_OPENAI_URL);

export const useAccessStore = create<AccessControlStore>()(
  persist(
    (set, get) => ({
      token: "",
      accessCode: "",
      azureDeployName: "",
      enableAOAI: false,
      needCode: true,
      hideUserApiKey: false,
      openaiUrl: DEFAULT_OPENAI_URL,
      workers: [],
      hideBalanceQuery: false,
      disableGPT4: false,

      enabledAccessControl() {
        get().fetch();

        return get().needCode;
      },
      updateOpenaiUrl(openaiUrl: string) {
        set(() => ({ openaiUrl: openaiUrl }));
      },
      updateCode(code: string) {
        set(() => ({ accessCode: code?.trim() }));
      },
      updateToken(token: string) {
        set(() => ({ token: token?.trim() }));
      },
      updateWorkers(workers: worker[]) {
        set(() => ({ workers }));
      },
      updateOpenAiUrl(url: string) {
        set(() => ({ openaiUrl: url?.trim() }));
      },
      updateDeployName(azureDeployName: string) {
        set((state) => ({ azureDeployName }));
      },
      switchAOAI(switchStatus: boolean) {
        set((state) => ({ enableAOAI: switchStatus }));
      },
      isAuthorized() {
        get().fetch();

        // has token or has code or disabled access control
        if (get().enableAOAI) {
          return !!get().azureDeployName && !!get().token;
        }

        return (
          !!get().token || !!get().accessCode || !get().enabledAccessControl()
        );
      },
      fetch() {
        if (getClientConfig()?.buildMode === "export") {
          get().workers = WORKERS_LIST;
          get().needCode = true;
        }
        if (fetchState > 0 || getClientConfig()?.buildMode === "export") return;
        fetchState = 1;
        fetch("/api/config", {
          method: "post",
          body: null,
          headers: {
            ...getHeaders(),
          },
        })
          .then((res) => res.json())
          .then((res: DangerConfig) => {
            console.log("[Config] got config from server", res);
            set(() => ({ ...res }));

            if (res.disableGPT4) {
              DEFAULT_MODELS.forEach(
                (m: any) => (m.available = !m.name.startsWith("gpt-4")),
              );
            }
          })
          .catch(() => {
            console.error("[Config] failed to fetch config");
          })
          .finally(() => {
            fetchState = 2;
          });
      },
    }),
    {
      name: StoreKey.Access,
      version: 1,
    },
  ),
);
