/**
 * LocalStorage wrapper für die Tic Tac Toe App
 */

const NS = 'tictactoe:';

/**
 * Get value from localStorage
 * @param {string} key - Storage key
 * @param {*} fallback - Fallback value if key doesn't exist
 * @returns {*} Parsed value or fallback
 */
export const get = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(NS + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`Storage get error for key "${key}":`, error);
    return fallback;
  }
};

/**
 * Set value in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export const set = (key, value) => {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Storage set error for key "${key}":`, error);
    return false;
  }
};

/**
 * Remove value from localStorage
 * @param {string} key - Storage key
 */
export const remove = (key) => {
  try {
    localStorage.removeItem(NS + key);
  } catch (error) {
    console.warn(`Storage remove error for key "${key}":`, error);
  }
};

/**
 * Clear all app data from localStorage
 */
export const clear = () => {
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(NS));
    keys.forEach(k => localStorage.removeItem(k));
  } catch (error) {
    console.warn('Storage clear error:', error);
  }
};

/**
 * Check if localStorage is available
 * @returns {boolean}
 */
export const isAvailable = () => {
  try {
    const testKey = NS + '__test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get all keys with our namespace
 * @returns {string[]}
 */
export const getAllKeys = () => {
  try {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(NS))
      .map(k => k.substring(NS.length));
  } catch {
    return [];
  }
};