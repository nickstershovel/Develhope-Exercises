const express = require("express");

function createApp() {
const app = express();

app.get("/", (req, res) => {
res.setHeader("Content-Type", "text/html");
res.send("Welcome to the World Wide Web!");
});

return app;
}

module.exports = createApp;