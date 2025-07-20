module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^../utils/getApiBase$': '<rootDir>/src/utils/getApiBase.jest.js',
  },
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.mjs' }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(identity-obj-proxy)/)',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};
