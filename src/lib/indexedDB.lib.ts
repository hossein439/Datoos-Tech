import { openDB } from "idb";

const DB_NAME = "zustand-db";
const STORE_NAME = "zustand-store";
const KEY = "my-zustand-store";

const indexedDBStorage = {
  getItem: async () => {
    const db = await openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME);
      },
    });
    return (await db.get(STORE_NAME, KEY)) || null;
  },
  setItem: async (_name: string, value: string) => {
    const db = await openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME);
      },
    });
    await db.put(STORE_NAME, value, KEY);
  },
  removeItem: async () => {
    const db = await openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME);
      },
    });
    await db.delete(STORE_NAME, KEY);
  },
};

export default indexedDBStorage;
