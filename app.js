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
// Import required modules
const client_1 = __importDefault(require("./lib/prisma/client"));
const cors_1 = __importDefault(require("cors"));
const validation_1 = require("./lib/prisma/validation");
const multer_1 = require("./lib/middleware/multer");
// Initialize multer middleware for handling file uploads
const upload = (0, multer_1.initMulterMiddleware)();
// Set CORS options
const corsOptions = {
    origin: "http://localhost:8080",
};
// Initialize express application
const express = require("express");
const app = express();
// Get port from environment variable
const port = process.env.PORT;
// Set up middleware
app.use(express.json()); // Parse JSON request body
app.use((0, cors_1.default)(corsOptions)); // Enable CORS
// Set up routes
app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
});
// Get all planets
app.get("/planets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resources = yield client_1.default.planet.findMany();
        res.json(resources);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Create a new planet
app.post("/planets", (0, validation_1.validate)({ body: validation_1.planetSchema }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planetData = req.body;
    const planet = yield client_1.default.planet.create({
        data: planetData,
    });
    res.status(201).json(planet);
}));
// Get a planet by ID
app.get("/planets/:id(\\d+)", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const planetId = parseInt(req.params.id);
    const planet = yield client_1.default.planet.findUnique({ where: { id: planetId } });
    if (!planet) {
        res.status(404);
        return next(`Cannot GET /planets/${planetId}`);
    }
    res.json(planet);
}));
// Update a planet by ID
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
// Delete a planet by ID
app.delete("/planets/:id(\\d+)", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const planetId = parseInt(req.params.id);
    try {
        yield client_1.default.planet.delete({
            where: { id: planetId },
        });
        res.status(204).end();
    }
    catch (error) {
        res.status(404);
        next(`Cannot DELETE /planets/${planetId}`);
    }
}));
// Define an endpoint to upload a photo for a planet with a specific ID
app.post("/planets/:id(\\d+)/photo", // URL pattern with regex to only accept numeric IDs
upload.single("photo"), // Use the 'upload' middleware to handle file uploads
// Handler function for the endpoint
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if a file was uploaded
    if (!req.file) {
        res.status(400); // Set response status code to 400 Bad Request
        return next("No photo file uploaded!"); // Call the next middleware with an error message
    }
    // Get the planet ID from the URL parameters and the uploaded file's filename
    const planetId = Number(req.params.id);
    const photoFilename = req.file.filename;
    try {
        // Update the planet with the new photo filename using the Prisma ORM
        yield client_1.default.planet.update({
            where: { id: planetId },
            data: { photoFilename },
        });
        res.status(201).json(photoFilename); // Set response status code to 201 Created and return the photo filename as JSON
    }
    catch (error) {
        res.status(404); // Set response status code to 404 Not Found
        next(`Cannot POST /planets/${planetId}/photo`); // Call the next middleware with an error message
    }
}));
// Serve uploaded photos at a separate URL endpoint
app.use('/planets/photos/', express.static("uploads"));
// Start the server on the specified port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
// Use the validationErrorMiddleware for handling validation errors in other routes
app.use(validation_1.validationErrorMiddleware);
// Export the Express app instance as the default export
exports.default = app;
