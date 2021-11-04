module.exports = {
  transform: {
    ".(ts|tsx)": "<rootDir>/src/Entities/tests/preprocessor.js",
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/Entities/tests/setup.ts"],
  moduleNameMapper: {
    "^@Entities/(.*)$": "<rootDir>/src/Entities/$1",
    "^@frameworks/(.*)$": "<rootDir>/src/frameworks/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },
};
