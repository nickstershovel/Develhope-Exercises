const express = require("express");
const app = express();
const port = process.env.PORT || 3020;

import prisma from "./lib/prisma/client"

import { validate, PlanetData, planetSchema, validationErrorMiddleware } from "./lib/prisma/validation";

app.use(express.json())

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


app.post('/planets', validate({ body: planetSchema }), async (req, res) => {
        const planet: PlanetData = req.body;
        // const newPlanet = await prisma.planet.create({
        //     data: planet,
        // });
        res.status(201).json(planet);
});

app.get('/planets/:id', async (req, res) => {
    try {
        const planetId = parseInt(req.params.id);
        const planet = await prisma.planet.findUnique({ where: { id: planetId } });
        if (!planet) {
            return res.status(404).json({ error: `Planet with ID ${planetId} not found` });
        }
        res.json(planet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
)

app.put('/planets/:id', async (req, res) => {
    try {
        const planetId = parseInt(req.params.id);
        const planetToUpdate = await prisma.planet.findUnique({ where: { id: planetId } });
        if (!planetToUpdate) {
            return res.status(404).json({ error: `Planet with ID ${planetId} not found` });
        }
        const updatedPlanet = await prisma.planet.update({
            where: { id: planetId },
            data: req.body,
        });
        res.json(updatedPlanet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/planets/:id', async (req, res) => {
    try {
        const planetId = parseInt(req.params.id);
        const planetToDelete = await prisma.planet.findUnique({ where: { id: planetId } });
        if (!planetToDelete) {
            return res.status(404).json({ error: `Planet with ID ${planetId} not found` });
        }
        await prisma.planet.delete({ where: { id: planetId } });
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
app.use(validationErrorMiddleware);

export default app;
