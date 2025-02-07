// config/database.js
const { Sequelize } = require("sequelize");
require("dotenv").config(); // Ensure dotenv is loaded to access .env variables

// Initialize Sequelize instance with database credentials
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql", // or 'postgres', 'sqlite', etc. depending on your DB
    logging: false, // Disable SQL query logging
  }
);

// Test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Database Connected Successfully!");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1); // Exit the application if DB connection fails
  }
};

// Sync the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Change to force: true if you need to reset tables
    console.log("✅ Database Synced Successfully!");
  } catch (error) {
    console.error("❌ Error Syncing Database:", error);
  }
};

// Export the sequelize instance and the connection/sync functions
module.exports = { sequelize, connectDB, syncDatabase };
