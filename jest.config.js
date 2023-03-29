module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    clearMocks: true,
    setupFilesAfterEnv: ["./lib/prisma/client.mock.ts"],
    testMatch: ["**/?(*.)+(spec|test).js"],
}