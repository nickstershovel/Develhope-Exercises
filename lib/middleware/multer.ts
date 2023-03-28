const multer = require('multer');

export const multerOptions = {}

export const initMulterMiddleware = () => {
  return multer(multerOptions)
}