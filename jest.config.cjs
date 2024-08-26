module.exports = {
    testEnvironment: "jsdom",

    roots: ["<rootDir>/src/"],

    testMatch: ["**/*.test.ts?(x)"],

    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },

    setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
    collectCoverage: true,

    coverageDirectory: "<rootDir>/coverage/",
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{ts,tsx}",
        "!**/__mocks__/**",
        "!**/node_modules/**",
        "!**/*.d.ts",
    ],

    moduleNameMapper: {
        "^.+\\.module\\.(css|sass|scss|less)$": "identity-obj-proxy",

        "^.+\\.(css|sass|scss|less)$": "<rootDir>/__mocks__/styleMock.js",

        "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg|ttf|woff|woff2)$": `<rootDir>/__mocks__/fileMock.js`,

        "^src/(.*)$": "<rootDir>/src/$1",
    },

    verbose: true,
    testTimeout: 30000,
};
