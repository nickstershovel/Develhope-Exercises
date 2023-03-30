// Import required modules
import prisma from "./lib/prisma/client";
import cors from "cors";
import {
    validate,
    PlanetData,
    planetSchema,
    validationErrorMiddleware,
} from "./lib/prisma/validation";
import { initMulterMiddleware } from "./lib/middleware/multer";

// Initialize multer middleware for handling file uploads
const upload = initMulterMiddleware();

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
app.use(cors(corsOptions)); // Enable CORS

// Set up routes
app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
});

// Get all planets
app.get("/planets", async (req, res) => {
    try {
        const resources = await prisma.planet.findMany();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new planet
app.post("/planets", validate({ body: planetSchema }), async (req, res) => {
    const planetData: PlanetData = req.body;

    const planet = await prisma.planet.create({
        data: planetData,
    });
    res.status(201).json(planet);
});

// Get a planet by ID
app.get("/planets/:id(\\d+)", async (req, res, next) => {
    const planetId = parseInt(req.params.id);
    const planet = await prisma.planet.findUnique({ where: { id: planetId } });

    if (!planet) {
        res.status(404);
        return next(`Cannot GET /planets/${planetId}`);
    }
    res.json(planet);
});

// Update a planet by ID
app.put(
    "/planets/:id(\\d+)",
    validate({ body: planetSchema }),
    async (req, res, next) => {
        const planetId = parseInt(req.params.id);
        const planetData = req.body;

        try {
            const updatedPlanet = await prisma.planet.update({
                where: { id: planetId },
                data: planetData,
            });
            res.json(updatedPlanet);
        } catch (error) {
            res.status(404);
            next(`Cannot PUT /planets/${planetId}`);
        }
    }
);

// Delete a planet by ID
app.delete("/planets/:id(\\d+)", async (req, res, next) => {
    const planetId = parseInt(req.params.id);

    try {
        await prisma.planet.delete({
            where: { id: planetId },
        });
        res.status(204).end();
    } catch (error) {
        res.status(404);
        next(`Cannot DELETE /planets/${planetId}`);
    }
});

// Define an endpoint to upload a photo for a planet with a specific ID
app.post(
    "/planets/:id(\\d+)/photo", // URL pattern with regex to only accept numeric IDs
    upload.single("photo"), // Use the 'upload' middleware to handle file uploads

    // Handler function for the endpoint
    async (req, res, next) => {
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
            await prisma.planet.update({
                where: { id: planetId },
                data: { photoFilename },
            })
            res.status(201).json(photoFilename); // Set response status code to 201 Created and return the photo filename as JSON
        } catch (error) {
            res.status(404); // Set response status code to 404 Not Found
            next(`Cannot POST /planets/${planetId}/photo`); // Call the next middleware with an error message
        }
    }
);

// Serve uploaded photos at a separate URL endpoint
app.use('/planets/photos/', express.static("uploads"));

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Use the validationErrorMiddleware for handling validation errors in other routes
app.use(validationErrorMiddleware);

// Export the Express app instance as the default export
export default app;
