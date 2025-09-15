import { create } from "zustand";
import CryptoService from "@/service/crypto";
import { persist, createJSONStorage } from "zustand/middleware";
import indexedDBStorage from "@/lib/indexedDB.lib";

interface CryptoStore {
  getInstance: () => CryptoService;
  getList: (data: object) => Promise<any>;
}

const useCryptoStore = create<CryptoStore>()(
  persist(
    (set, get) => ({
      getInstance: () => CryptoService.getInstance(),
      getList: (data) => get().getInstance().getList(data),
    }),
    {
      name: "crypto-store",
      storage: createJSONStorage(() => indexedDBStorage),
    }
  )
);

export default useCryptoStore;
