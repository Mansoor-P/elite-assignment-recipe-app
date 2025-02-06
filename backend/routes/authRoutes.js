const express = require("express");
const { check } = require("express-validator");
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");  // Corrected import
const roleMiddleware = require("../middleware/roleMiddleware");  // Corrected import

const router = express.Router();

// User Registration
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),  // Name is required
    check("email", "Valid email is required").isEmail(),  // Email should be valid
    check("password", "Password must be 6+ characters").isLength({ min: 6 }),  // Password should be at least 6 characters
  ],
  register  // Call the register controller
);

// User Login
router.post(
  "/login",
  [
    check("email", "Valid email is required").isEmail(),  // Email should be valid
    check("password", "Password is required").exists(),  // Password should be present
  ],
  login  // Call the login controller
);

// Protected Routes with Role Middleware
// Route accessible only to admins
router.get("/admin", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.json({ message: "Welcome, Admin!" });  // Only admin can access this
});

// Route accessible only to vendors
router.get("/vendor", authMiddleware, roleMiddleware(["vendor"]), (req, res) => {
  res.json({ message: "Welcome, Vendor!" });  // Only vendor can access this
});

module.exports = router;
