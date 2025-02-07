const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Extract token from headers (x-auth-token or Authorization Bearer)
    let token = req.header("x-auth-token") || req.header("Authorization");

    if (token?.startsWith("Bearer ")) {
      token = token.split(" ")[1]; // Extract token after "Bearer "
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = decoded;

    next(); // Proceed to next middleware/route
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
