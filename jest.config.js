module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    clearMocks: true,
    setupFilesAfterEnv: [
        "./lib/client.mock.ts",
        "./lib/middleware/multer.mock.ts"
],
    testMatch: ["**/?(*.)+(spec|test).ts"],
}