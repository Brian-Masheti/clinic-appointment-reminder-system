import '@testing-library/jest-dom';

// Patch globalThis.import.meta.env for all import.meta.env usage in Jest
const viteEnvMock = { VITE_API_BASE: 'http://localhost:5000/api' };
let originalImport;

beforeAll(() => {
  if (!('import' in globalThis)) {
    globalThis.import = { meta: { env: viteEnvMock } };
  } else {
    // Save original if present
    originalImport = globalThis.import;
    globalThis.import = { meta: { env: viteEnvMock } };
  }
});

afterAll(() => {
  if (originalImport) {
    globalThis.import = originalImport;
  } else {
    delete globalThis.import;
  }
});

