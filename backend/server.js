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
app.get("/", async (req, res) => {
  try {
    res.send(
      `Welcome to Elite Tech Park E-commerce API at ${process.env.BASE_URL}`
    );
  } catch (err) {
    res.status(500).json({ message: "Error in default route" });
  }
});

// Import Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Product Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
    error: err.stack || null,
  });
});

// Start Server
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not defined in .env
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

const startServer = async () => {
  try {
    await connectDB(); // Connect to DB
    await syncDatabase(); // Sync Tables

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`API Base URL: ${BASE_URL}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit process if there's an error starting the server
  }
};

startServer();
