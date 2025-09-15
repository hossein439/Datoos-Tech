/**
 * Retrieves and decrypts a value from the local storage by its name.
 * @param {string} nameSpace - The name of the item in local storage.
 * @returns {*} Returns the decrypted value from local storage, or null if the item doesn't exist.
 */
export const getLocalStorageItem = (key) => {
  const itemValue = localStorage.getItem(key);
  return typeof itemValue !== 'object' ? itemValue : JSON.parse(localStorage.getItem(key));
};

/**
 * Encrypts and sets a value in local storage by its name.
 * @param {string} key - The name of the item in local storage.
 * @param {*} value - The value to be stored in local storage.
 */
export const setLocalStorageItem = (key, value) => {
  typeof value === 'object' ? localStorage.setItem(key, JSON.stringify(value)) : localStorage.setItem(key, value);
};

/**
 * Removes an item from local storage by its name.
 * @param {string} key - The name of the item to be removed from local storage.
 */
export const removeLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};

/**
 * Object containing functions for local storage operations.
 * @property {Function} get - Function to retrieve and decrypt a value from local storage.
 * @property {Function} set - Function to encrypt and set a value in local storage.
 * @property {Function} remove - Function to remove an item from local storage.
 */
export default {
  get: getLocalStorageItem,
  set: setLocalStorageItem,
  remove: removeLocalStorageItem,
};
