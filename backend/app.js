require('dotenv').config()
const express = require("express");
const app = express();
const jobRouter = require("./routes/jobRouter");
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

// Middlewares
app.use(cors())
app.use(express.json());

connectDB();

// Use the jobRouter for all "/jobs" routes
app.use("/api/jobs", jobRouter);

// Serve static files from built frontend
const viewPath = path.join(__dirname, "view");
app.use(express.static(viewPath));

// SPA fallback: serve index.html for non-API routes
app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    return res.sendFile(path.join(viewPath, "index.html"));
});

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;