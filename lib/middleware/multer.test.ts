import { generatePhotoFileName } from "./multer";

describe("generatePhotoFileName", () => {
  test.each([
    ["image/png", "png"],
    ["image/jpeg", "jpeg"],
  ])(
    "Generates a file name with correct extension when passed mime type '%s'",
    (mimeType, expectedFileExtension) => {
      const fullFileName = generatePhotoFileName(mimeType)
      const [, fileExtension] = fullFileName.split(".");

      expect(fileExtension).toEqual(expectedFileExtension)
    }
  );
});
