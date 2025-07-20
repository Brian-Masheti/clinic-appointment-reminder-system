// src/utils/getApiBase.js

export default function getApiBase() {
  // Only use import.meta.env if not running in Node (Jest)
  if (typeof window !== 'undefined' && typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) {
    return import.meta.env.VITE_API_BASE;
  }
  // For tests or Node
  if (typeof globalThis !== 'undefined' && globalThis.__API_BASE__) {
    return globalThis.__API_BASE__;
  }
  return 'http://localhost:5000/api';
}
