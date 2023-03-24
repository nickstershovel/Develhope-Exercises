"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planetSchema = void 0;
var typebox_1 = require("@sinclair/typebox");
exports.planetSchema = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    diameter: typebox_1.Type.Integer()
}, { additionalProperties: false });
