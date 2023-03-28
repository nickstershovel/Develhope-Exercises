"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMulterMiddleware = exports.multerOptions = void 0;
var multer = require('multer');
exports.multerOptions = {};
var initMulterMiddleware = function () {
    return multer(exports.multerOptions);
};
exports.initMulterMiddleware = initMulterMiddleware;
