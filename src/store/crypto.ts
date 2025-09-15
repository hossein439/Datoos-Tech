import { create } from 'zustand';
// import CryptoService from '@/service/crypto';
import { persist, createJSONStorage } from 'zustand/middleware';
import indexedDBStorage from '@/lib/shared/indexedDB.lib';
// import axios from 'axios';

type Crypto = {
  id: number;
  name: string;
  symbol: string;
  price: number;
};

interface CryptoStore {
  cryptos: Crypto[];
  page: number;
  limit: number;
  setCryptos: (cryptos: Crypto[]) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  _hydrated: boolean;
  _setHydrated: (v: boolean) => void;
}

const useCryptoStore = create<CryptoStore>()(
  persist(
    (set, get) => ({
      cryptos: [],
      page: 1,
      limit: 10,
      setCryptos: (cryptos) => set({ cryptos }),
      setPage: (page) => set({ page }),
      setLimit: (limit) => set({ limit }),
      _hydrated: false,
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
