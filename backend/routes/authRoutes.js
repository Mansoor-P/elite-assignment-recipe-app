const express = require("express");
const { check } = require("express-validator");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// User Registration
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("password", "Password must be 6+ characters").isLength({ min: 6 }),
  ],
  register
);

// User Login
router.post(
  "/login",
  [
    check("email", "Valid email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

module.exports = router;
