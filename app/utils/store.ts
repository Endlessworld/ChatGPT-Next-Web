import { create } from "zustand";
import { combine, persist, PersistStorage } from "zustand/middleware";
import { Updater } from "../typing";
// import { deepClone } from "./clone";
import localforage from "localforage";
import { debounce } from "lodash";
import { deepClone } from "@/app/utils/clone";

localforage.config();
// 定义适配器函数将localforage返回的Promise类型转换为void类型
const storageAdapter: PersistStorage<any> = {
  getItem: (key) =>
    localforage.getItem(key).then((value) => {
      if (value) {
        return JSON.parse(typeof value === "string" ? value : "{}");
      }
      return {};
    }),
  setItem: debounce((key, value) => {
    // 在这里使用了防抖函数
    console.log(`Setting item - Key: ${key}`); // 日志输出 key 和 value
    return localforage.setItem(key, JSON.stringify(value)) as Promise<any>;
  }, 200), // 这里假设延迟为 200ms
  removeItem: (key) => localforage.removeItem(key) as Promise<void>,
};

type SecondParam<T> = T extends (
  _f: infer _F,
  _s: infer S,
  ...args: infer _U
) => any
  ? S
  : never;

type MakeUpdater<T> = {
  lastUpdateTime: number;

  markUpdate: () => void;
  update: Updater<T>;
};

type SetStoreState<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined,
) => void;

export function createPersistStore<T extends object, M>(
  state: T,
  methods: (
    set: SetStoreState<T & MakeUpdater<T>>,
    get: () => T & MakeUpdater<T>,
  ) => M,
  persistOptions: SecondParam<typeof persist<T & M & MakeUpdater<T>>>,
  useAdapter = false,
) {
  if (useAdapter) {
    persistOptions.storage = storageAdapter;
  }
  return create(
    persist(
      combine(
        {
          ...state,
          lastUpdateTime: 0,
        },
        (set, get) => {
          return {
            ...methods(set, get as any),
            markUpdate: debounce(() => {
              console.log("markUpdate >>>", Date.now());
              set({ lastUpdateTime: Date.now() } as Partial<
                T & M & MakeUpdater<T>
              >);
            }, 500),
            update(updater) {
              console.log("update >>>", Date.now());
              const state = deepClone(get());
              updater(state);
              set({
                ...state,
                lastUpdateTime: Date.now(),
              });
            },
          } as M & MakeUpdater<T>;
        },
      ),
      persistOptions as any,
    ),
  );
}
