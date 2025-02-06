require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { connectDB, syncDatabase } = require("./config/database");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Elite Tech Park E-commerce API");
});

// Import Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not defined in .env
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.get("/", (req, res) => {
  res.send(`Welcome to Elite Tech Park E-commerce API at ${BASE_URL}`);
});

const startServer = async () => {
  await connectDB(); // Connect to DB
  await syncDatabase(); // Sync Tables

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
