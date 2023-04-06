/**

This file sets up the Express application and exports it as the default export.
It includes middleware for parsing JSON request bodies, enabling CORS, and handling validation errors.
It also includes middleware for initializing and using sessions and Passport authentication.
The app uses routes for handling requests related to planets and authentication.
*/
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

// Use middleware for initializing and using sessions and Passport authentication
app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

// Set up middleware
app.use(express.json()); // Parse JSON request body
app.use(cors(corsOptions)); // Enable CORS

// Use routes for handling requests related to planets and authentication
app.use("/planets", planetsRoutes);
app.use("/auth", authRoutes);

// Use the validationErrorMiddleware for handling validation errors in other routes
app.use(validationErrorMiddleware);

// Export the Express app instance as the default export
export default app;