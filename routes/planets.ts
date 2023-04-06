import express, { Router } from "express";

// Import required modules
import prisma from "../lib/client";
import cors from "cors";
import { validate, PlanetData, planetSchema } from "../lib/validation";

import { checkAuthorization } from "../lib/middleware/passport";

import { initMulterMiddleware } from "../lib/middleware/multer";

// Initialize multer middleware for handling file uploads
const upload = initMulterMiddleware();

const router = Router();

// Get all planets
router.get("/", async (req, res) => {
    try {
        const resources = await prisma.planet.findMany();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new planet
router.post(
    "/",
    checkAuthorization,
    validate({ body: planetSchema }),
    async (req, res) => {
        const planetData: PlanetData = req.body;
        const username = req.user.username

        const planet = await prisma.planet.create({
            data: {
                ...planetData,
                createdBy: username,
                updatedBy: username,
            }
        });
        res.status(201).json(planet);
    }
);

// Get a planet by ID
router.get("/:id(\\d+)", async (req, res, next) => {
    const planetId = parseInt(req.params.id);
    const planet = await prisma.planet.findUnique({ where: { id: planetId } });

    if (!planet) {
        res.status(404);
        return next(`Cannot GET /planets/${planetId}`);
    }
    res.json(planet);
});

// Update a planet by ID
router.put(
    "/:id(\\d+)",
    checkAuthorization,
    validate({ body: planetSchema }),
    async (req, res, next) => {
        const planetId = parseInt(req.params.id);
        const planetData = req.body;
        const username = req.user?.username as string;

        try {
            const updatedPlanet = await prisma.planet.update({
                where: { id: planetId },
                data: {
                    ...planetData,
                    updatedBy: username
                }
            });
            res.json(updatedPlanet);
        } catch (error) {
            res.status(404);
            next(`Cannot PUT /planets/${planetId}`);
        }
    }
);

// Delete a planet by ID
router.delete("/:id(\\d+)", checkAuthorization, async (req, res, next) => {
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
router.post(
    "/:id(\\d+)/photo", // URL pattern with regex to only accept numeric IDs
    checkAuthorization,
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
            });
            res.status(201).json(photoFilename); // Set response status code to 201 Created and return the photo filename as JSON
        } catch (error) {
            res.status(404); // Set response status code to 404 Not Found
            next(`Cannot POST /planets/${planetId}/photo`); // Call the next middleware with an error message
        }
    }
);

// Serve uploaded photos at a separate URL endpoint
router.use("/photos/", express.static("uploads"));

export default router;
