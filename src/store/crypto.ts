import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import indexedDBStorage from '@/lib/shared/indexedDB.lib';

type Crypto = {
  id: number;
  name: string;
  symbol: string;
  price: number;
};

interface CryptoStore {
  _hydrated: boolean;
  cryptos: Crypto[];
  page: number;
  limit: number;
  enabled: boolean;
  setCryptos: (cryptos: Crypto[]) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setEnabled: (enabled: boolean) => void;
  _setHydrated: (v: boolean) => void;
}

const useCryptoStore = create<CryptoStore>()(
  persist(
    (set, get) => ({
      _hydrated: false,
      cryptos: [],
      page: 1,
      limit: 10,
      enabled: false,
      setCryptos: (cryptos) => set({ cryptos }),
      setPage: (page) => set({ page }),
      setLimit: (limit) => set({ limit }),
      setEnabled: (enabled) => set({ enabled }),
      _setHydrated: (v) => set({ _hydrated: v }),
    }),
    {
      name: 'crypto-store',
      storage: createJSONStorage(() => indexedDBStorage),
      partialize: (state) => ({ cryptos: state.cryptos }),
      onRehydrateStorage: () => (state) => {
        state?._setHydrated(true);
      },
    },
  ),
);

export default useCryptoStore;
