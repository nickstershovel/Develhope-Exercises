const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// GET route that sends a JSON response
app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Integration test for the GET route
if (process.env.NODE_ENV !== "test") {
    app.get("/test", (req, res) => {
        res.json({ message: "Integration test passed!" });
    });
}

module.exports = app;
