const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Disable logging queries
  }
);

// Test the connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Database Connected Successfully!");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1); // Stop app if DB connection fails
  }
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("✅ Database Synced Successfully!");
  } catch (error) {
    console.error("❌ Error Syncing Database:", error);
  }
};

module.exports = { sequelize, connectDB, syncDatabase };
