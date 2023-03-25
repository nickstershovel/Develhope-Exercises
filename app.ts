import prisma from "./lib/prisma/client";
import * as cors from "cors"

import {
    validate,
    PlanetData,
    planetSchema,
    validationErrorMiddleware,
} from "./lib/prisma/validation";

const corsOptions = {
    origin: 'http://localhost:8080'
};
const express = require("express");
const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
});

app.get("/planets", async (req, res) => {
    try {
        const resources = await prisma.planet.findMany();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/planets", validate({ body: planetSchema }), async (req, res) => {
    const planetData: PlanetData = req.body;

    const planet = await prisma.planet.create({
        data: planetData,
    });
    res.status(201).json(planet);
});

app.get("/planets/:id(\\d+)", async (req, res, next) => {
    const planetId = parseInt(req.params.id);
    const planet = await prisma.planet.findUnique({ where: { id: planetId } });
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
});

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

app.delete("/planets/:id(\\d+)", async (req, res, next) => {
    const planetId = parseInt(req.params.id);

    try {
        await prisma.planet.delete({
            where: { id: planetId }
        });
        res.status(204).end();
    } catch (error) {
        res.status(404);
        next(`Cannot DELETE /planets/${planetId}`);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
app.use(validationErrorMiddleware);

export default app;
