"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const validation_1 = require("./lib/validation");
const planets_1 = __importDefault(require("./routes/planets"));
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
app.use((0, cors_1.default)(corsOptions)); // Enable CORS
app.use("/planets", planets_1.default);
// Use the validationErrorMiddleware for handling validation errors in other routes
app.use(validation_1.validationErrorMiddleware);
// Export the Express app instance as the default export
exports.default = app;
