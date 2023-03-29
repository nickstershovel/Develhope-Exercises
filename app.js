"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./lib/prisma/client"));
const cors_1 = __importDefault(require("cors"));
const validation_1 = require("./lib/prisma/validation");
const multer_1 = require("./lib/middleware/multer");
const upload = (0, multer_1.initMulterMiddleware)();
const corsOptions = {
    origin: 'http://localhost:8080'
};
const express = require("express");
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use((0, cors_1.default)(corsOptions));
app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
});
app.get("/planets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resources = yield client_1.default.planet.findMany();
        res.json(resources);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
app.post("/planets", (0, validation_1.validate)({ body: validation_1.planetSchema }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planetData = req.body;
    const planet = yield client_1.default.planet.create({
        data: planetData,
    });
    res.status(201).json(planet);
}));
app.get("/planets/:id(\\d+)", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const planetId = parseInt(req.params.id);
    const planet = yield client_1.default.planet.findUnique({ where: { id: planetId } });
    //     if (!planet) {
    //         return res.status(404).json({ error: `Planet with ID ${planetId} not found` });
    //     }
    //     res.json(planet);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    if (!planet) {
        res.status(404);
        return next(`Cannot GET /planets/${planetId}`);
    }
    res.json(planet);
}));
app.put("/planets/:id(\\d+)", (0, validation_1.validate)({ body: validation_1.planetSchema }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const planetId = parseInt(req.params.id);
    const planetData = req.body;
    try {
        const updatedPlanet = yield client_1.default.planet.update({
            where: { id: planetId },
            data: planetData,
        });
        res.json(updatedPlanet);
    }
    catch (error) {
        res.status(404);
        next(`Cannot PUT /planets/${planetId}`);
    }
}));
app.delete("/planets/:id(\\d+)", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const planetId = parseInt(req.params.id);
    try {
        yield client_1.default.planet.delete({
            where: { id: planetId }
        });
        res.status(204).end();
    }
    catch (error) {
        res.status(404);
        next(`Cannot DELETE /planets/${planetId}`);
    }
}));
app.post("/planets/:id(\\d+)/photo", upload.single("photo"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.file", req.file);
    if (!req.file) {
        res.status(400);
        return next("No photo file uploaded!");
    }
    const photoFilename = req.file.filename;
    res.status(201).json(photoFilename);
}));
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
app.use(validation_1.validationErrorMiddleware);
exports.default = app;
