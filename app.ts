import { Express } from "express";
import cors from "cors";

import { validationErrorMiddleware } from "./lib/validation";
import { initSessionMiddleware } from "./lib/middleware/sessions";
import { passport } from "./lib/middleware/passport";

import planetsRoutes from "./routes/planets";

import authRoutes from "./routes/auth";
// Set CORS options
const corsOptions = {
    origin: "http://localhost:8080",
    credentials: true,
};

// Initialize express application
const express = require("express");
const app = express();

// Get port from environment variable
const port = process.env.PORT;
app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());
// Set up middleware
app.use(express.json()); // Parse JSON request body
app.use(cors(corsOptions)); // Enable CORS

app.use("/planets", planetsRoutes);
app.use("/auth", authRoutes);

// Use the validationErrorMiddleware for handling validation errors in other routes
app.use(validationErrorMiddleware);

// Export the Express app instance as the default export
export default app;
