const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
app.use(express.json())

app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
});

app.get("/resources", async (req, res) => {
    try {
        const resources = await prisma.planet.findMany();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const NAME_REQUIRED_ERROR = 'Name field is required and must be a string';
const DIAMETER_REQUIRED_ERROR = 'Diameter field is required and must be a positive number';

app.post('/planets', async (req, res) => {
    try {
        const planet = req.body;

        // Validate name field
        if (!planet.name || typeof planet.name !== 'string') {
            return res.status(400).json({ errors: [NAME_REQUIRED_ERROR] });
        }

        // Validate diameter field
        if (!planet.diameter || typeof planet.diameter !== 'number' || planet.diameter <= 0) {
            return res.status(400).json({ errors: [DIAMETER_REQUIRED_ERROR] });
        }
        const newPlanet = await prisma.planet.create({
            data: planet,
        });
        res.status(201).json(newPlanet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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


module.exports = app;
