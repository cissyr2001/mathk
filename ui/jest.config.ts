import { Config } from "jest";

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Use jsdom for browser-like environment
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Setup file for @testing-library/jest-dom
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock CSS imports
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js', // Mock file imports
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

export default config;