// Import required modules
import express, { Router } from "express"; // Importing the express module and the Router class from the express package to use them for creating a router object and defining routes in our application.
import prisma from "../lib/client"; // Import the Prisma client for database access
import cors from "cors"; // Import the CORS middleware for handling cross-origin requests
import { validate, PlanetData, planetSchema } from "../lib/validation"; // Import validation functions and schema for validating planet data
import { checkAuthorization } from "../lib/middleware/passport"; // Import middleware function for checking user authentication
import { initMulterMiddleware } from "../lib/middleware/multer"; // Import middleware function for handling file uploads

// Initialize multer middleware for handling file uploads
const upload = initMulterMiddleware();

const router = Router(); // Create a new router instance

// Get all planets
router.get("/", async (req, res) => {
    try {
        const resources = await prisma.planet.findMany(); // Use Prisma client to retrieve all planets from the database
        res.json(resources); // Return the retrieved planets as JSON
    } catch (error) {
        res.status(500).json({ error: error.message }); // Return an error message if there was an error retrieving the planets
    }
});

// Create a new planet
router.post(
    "/",
    checkAuthorization, // Use the checkAuthorization middleware to ensure user is authenticated
    validate({ body: planetSchema }), // Use the validate middleware to validate the planet data against the planetSchema
    async (req, res) => {
        const planetData: PlanetData = req.body; // Extract the validated planet data from the request body
        const username = req.user.username; // Extract the authenticated user's username from the request object

        const planet = await prisma.planet.create({
            // Use the Prisma client to create a new planet in the database
            data: {
                ...planetData,
                createdBy: username, // Set the createdBy field to the authenticated user's username
                updatedBy: username, // Set the updatedBy field to the authenticated user's username
            },
        });
        res.status(201).json(planet); // Return the newly created planet as JSON with a 201 Created status code
    }
);

// Get a planet by ID
router.get("/:id(d+)", async (req, res, next) => {
    const planetId = parseInt(req.params.id); // Extract the planet ID from the URL parameters
    const planet = await prisma.planet.findUnique({ where: { id: planetId } }); // Use the Prisma client to retrieve the planet with the specified ID from the database

    if (!planet) {
        // If the planet was not found, return a 404 Not Found error
        res.status(404);
        return next(`Cannot GET /planets/${planetId}`);
    }
    res.json(planet); // Return the retrieved planet as JSON
});

// Update a planet by ID
router.put(
    "/:id(d+)",
    checkAuthorization, // Use the checkAuthorization middleware to ensure user is authenticated
    validate({ body: planetSchema }), // Use the validate middleware to validate the planet data against the planetSchema
    async (req, res, next) => {
        const planetId = parseInt(req.params.id); // Extract the planet ID from the URL parameters
        const planetData = req.body; // Extract the validated planet data from the request body
        const username = req.user?.username as string; // Extract the authenticated user's username from the request object

        try {
            const updatedPlanet = await prisma.planet.update({
                // Use the Prisma client to update the planet with the specified ID in the database
                where: { id: planetId },
                data: {
                    ...planetData,
                    updatedBy: username, // Set the updatedBy field to the authenticated user's username
                },
            });
            res.json(updatedPlanet); // Return the updated planet as JSON
        } catch (error) {
            res.status(404); // If the planet was not found, return a 404 Not Found error
            next(`Cannot PUT /planets/${planetId}`);
        }
    }
);

// Delete a planet by ID
router.delete("/:id(d+)", checkAuthorization, async (req, res, next) => {
    const planetId = parseInt(req.params.id); // Extract the planet ID from the URL parameters

    try {
        await prisma.planet.delete({
            // Use the Prisma client to delete the planet with the specified ID from the database
            where: { id: planetId },
        });
        res.status(204).end(); // Return a 204 No Content status code to indicate successful deletion
    } catch (error) {
        res.status(404); // If the planet was not found, return a 404 Not Found error
        next(`Cannot DELETE /planets/${planetId}`);
    }
});

// Define an endpoint to upload a photo for a planet with a specific ID
router.post(
    "/:id(d+)/photo", // URL pattern with regex to only accept numeric IDs
    checkAuthorization, // Use the checkAuthorization middleware to ensure user is authenticated
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
            res.status(404); // If the planet was not found, return a 404 Not Found error
            next(`Cannot POST /planets/${planetId}/photo`); // Call the next middleware with an error message
        }
    }
);

// Serve uploaded photos at a separate URL endpoint
router.use("/photos/", express.static("uploads"));

export default router; // Export the router for use in other modules
