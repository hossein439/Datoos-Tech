import Cookies from 'js-cookie';

/**
 * Retrieves the decrypted value of a cookie by its name.
 * @param {string} key - The name of the cookie.
 * @returns {string|null} Returns the decrypted value of the cookie or null if the cookie doesn't exist.
 */
export const getCookie = (key) => {
  return Cookies.get(key);
};

/**
 * Sets a cookie with an encrypted value.
 * @param {string} key - The name of the cookie.
 * @param {string} value - The value to be stored in the cookie.
 * @param {Object} [options={ expires: 1 }] - Additional options for the cookie (default expires in 1 day).
 */
export const setCookie = (key, value, options = {}) => {
  Cookies.set(key, value, options);
};

/**
 * Removes a cookie by its name.
 * @param {string} key - The name of the cookie to be removed.
 */
export const removeCookie = (key) => {
  Cookies.remove(key);
};

/**
 * Object containing functions for cookie management.
 * @property {Function} get - Function to retrieve the decrypted value of a cookie.
 * @property {Function} set - Function to set a cookie with an encrypted value.
 * @property {Function} remove - Function to remove a cookie by its name.
 */
export default {
  get: getCookie,
  set: setCookie,
  remove: removeCookie,
};
