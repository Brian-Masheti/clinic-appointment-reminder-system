// src/utils/getApiBase.jest.js

// Jest-safe version: never references import.meta
export default function getApiBase() {
  if (typeof globalThis !== 'undefined' && globalThis.__API_BASE__) {
    return globalThis.__API_BASE__;
  }
  return 'http://localhost:5000/api';
}
