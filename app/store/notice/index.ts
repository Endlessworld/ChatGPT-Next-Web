import { create } from "zustand";
import { persist } from "zustand/middleware";
import md5 from "spark-md5";

const LOCAL_KEY = "notice-store";

interface NoticeStore {
  notice: string | undefined;
  showNotice: boolean | undefined;
  noticeHash: string | undefined;
  showTimestamp: number | 0;
  update: (store: {}) => void;
  updateNotice: (notice: string) => boolean;
}

export const useNoticeStore = create<NoticeStore>()(
  persist(
    (set, get) => ({
      notice: undefined,
      showNotice: true,
      noticeHash: undefined,
      showTimestamp: 0,
      update(store: {}) {
        set((state) => ({ ...store }));
      },
      updateNotice(notice: string) {
        const hashNow = get().noticeHash;
        const hashNew = md5.hash(notice);
        if (hashNew == hashNow) return false;
        set((state) => ({ notice, noticeHash: hashNew }));
        return true;
      },
    }),
    {
      name: LOCAL_KEY,
      version: 1,
    },
  ),
);
