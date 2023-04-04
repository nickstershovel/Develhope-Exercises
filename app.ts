import { Express } from "express";
import cors from "cors";

import { validationErrorMiddleware } from "./lib/validation";

import planetsRoutes from "./routes/planets"
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

app.use("/planets", planetsRoutes)

// Use the validationErrorMiddleware for handling validation errors in other routes
app.use(validationErrorMiddleware);

// Export the Express app instance as the default export
export default app;
