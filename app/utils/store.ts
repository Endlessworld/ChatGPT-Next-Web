import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import { Updater } from "../typing";
// import { deepClone } from "./clone";
import localforage from "localforage";
import { debounce } from "lodash";
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

export function createPersistStore<T, M>(
  defaultState: T,
  methods: (
    set: SetStoreState<T & MakeUpdater<T>>,
    get: () => T & MakeUpdater<T>,
  ) => M,
  persistOptions: SecondParam<typeof persist<T & M & MakeUpdater<T>>>,
) {
  persistOptions.storage = storageAdapter;
  return create<T & M & MakeUpdater<T>>()(
    persist((set, get) => {
      return {
        ...defaultState,
        ...methods(set as any, get),

        lastUpdateTime: 0,
        markUpdate: debounce(() => {
          console.log("markUpdate >>>", Date.now());
          set({ lastUpdateTime: Date.now() } as Partial<
            T & M & MakeUpdater<T>
          >);
        }, 500),
        update(updater) {
          // const state = deepClone(get());
          const state = { ...get() };
          updater(state);
          get().markUpdate();
          set(state);
        },
      };
    }, persistOptions),
  );
}
