const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const db = require("./config/database");
const { app, server } = require("./config/socketconn");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

const PORT = process.env.PORT || 3000;
// const __dirname = path.resolve(); // Ensure __dirname is set correctly

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Make sure this is your frontend URL
    credentials: true,
  })
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend_1", "dist", "index.html"));
  });
}

// Start server and connect to DB
server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  db.connect(); // Ensure your DB connection is set up properly
});
