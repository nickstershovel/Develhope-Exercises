"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("./multer");
describe("generatePhotoFileName", () => {
    test.each([
        ["image/png", "png"],
        ["image/jpeg", "jpeg"],
    ])("Generates a file name with correct extension when passed mime type '%s'", (mimeType, expectedFileExtension) => {
        const fullFileName = (0, multer_1.generatePhotoFileName)(mimeType);
        const [, fileExtension] = fullFileName.split(".");
        expect(fileExtension).toEqual(expectedFileExtension);
    });
});
