import multer from "multer";
import { randomUUID } from "node:crypto";
import mime from "mime";

export const generatePhotoFileName = (mimeType: string) => {
  const randomFileName = `${randomUUID()}-${Date.now()}`;
  const fileExtension = mime.getExtension(mimeType);
  const filename = `${randomFileName}.${fileExtension}`;

  return filename;
};

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (request, file, callback) => {
    return callback(null, generatePhotoFileName(file.mimetype))

  }

});

export const multerOptions = {};

export const initMulterMiddleware = () => {
  return multer({ storage, ...multerOptions });
};
