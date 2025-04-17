/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Мапінг псевдоніму @/ на папку src/
  },
  moduleDirectories: ["node_modules", "src"], // Щоб Jest шукав модулі у src/
};

module.exports = config;
