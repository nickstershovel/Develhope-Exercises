"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
jest.mock("./multer", () => {
    const originalModule = jest.requireActual("./multer");
    return Object.assign(Object.assign({ __esModule: true }, originalModule), { initMulterMiddleware: () => {
            return (0, multer_1.default)(Object.assign({ storage: multer_1.default.memoryStorage() }, originalModule.multerOptions));
        } });
});
