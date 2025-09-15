// import { openDB } from "idb";

// const DB_NAME = "zustand-db";
// const STORE_NAME = "zustand-store";
// const KEY = "my-zustand-store";

// const indexedDBStorage = {
//   getItem: async () => {
//     const db = await openDB(DB_NAME, 1, {
//       upgrade(db) {
//         db.createObjectStore(STORE_NAME);
//       },
//     });
//     return (await db.get(STORE_NAME, KEY)) || null;
//   },
//   setItem: async (_name: string, value: string) => {
//     const db = await openDB(DB_NAME, 1, {
//       upgrade(db) {
//         db.createObjectStore(STORE_NAME);
//       },
//     });
//     await db.put(STORE_NAME, value, KEY);
//   },
//   removeItem: async () => {
//     const db = await openDB(DB_NAME, 1, {
//       upgrade(db) {
//         db.createObjectStore(STORE_NAME);
//       },
//     });
//     await db.delete(STORE_NAME, KEY);
//   },
// };

// export default indexedDBStorage;

import { openDB } from 'idb';

const DB_NAME = 'zustand-db';
const STORE_NAME = 'zustand-store';

async function getDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

const indexedDBStorage = {
  getItem: async (name: string) => {
    const db = await getDb();
    return (await db.get(STORE_NAME, name)) ?? null;
  },
  setItem: async (name: string, value: string) => {
    const db = await getDb();
    await db.put(STORE_NAME, value, name);
  },
  removeItem: async (name: string) => {
    const db = await getDb();
    await db.delete(STORE_NAME, name);
  },
};

export default indexedDBStorage;
