require("dotenv").config();
const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const cors = require("cors");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");

// Express app setup
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Static file serving - adjust 'build' to your actual folder structure
app.use(express.static(path.join(__dirname, "build")));

// WebSocket setup
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("WebSocket connection established");
    ws.on("message", (message) => {
        console.log("received: %s", message);
    });
    ws.send("Hello Client");
});

// Multer configuration for handling multipart/form-data
const storage = multer.memoryStorage(); // Using memory storage for the example
const upload = multer({
    storage: storage,
    limits: { fileSize: Infinity }, // No limit on file size
});

// MongoDB setup (example, adjust as needed)
const mongoose = require("mongoose");
mongoose
    .connect(process.env.DATABASE_ACCESS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));

// Example model - replace with your actual model
const File = require("./model/models"); // Ensure the path is correct

// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Example file upload route
app.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    // Handle the file here (e.g., upload to AWS S3)
    res.send({ message: "File uploaded successfully", file: req.file });
});

// Catch-all handler for SPA
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
