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

app.post('/planets', async (req, res) => {
    try {
        const planet = req.body;
        const newPlanet = await prisma.planet.create({
            data: planet
        });
        res.status(201).json(newPlanet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;
