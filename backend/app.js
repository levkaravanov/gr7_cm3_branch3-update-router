require('dotenv').config()
const express = require("express");
const app = express();
const jobRouter = require("./routes/jobRouter");
const userRouter = require("./routes/userRouter");
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
// Auth routes
app.use("/api/users", userRouter);

// Serve static files from built frontend
const viewPath = path.join(__dirname, "view");
app.use(express.static(viewPath));

// SPA fallback: serve index.html for all non-API routes (Express 5 compatible)
app.get(/^(?!\/api).*/, (req, res) => {
    return res.sendFile(path.join(viewPath, "index.html"));
});

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;