const jwt = require("jsonwebtoken");

const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
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

      // Check if user's role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }

      next(); // Proceed if role is valid
    } catch (error) {
      console.error("Role Middleware Error:", error);

      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token has expired. Please log in again." });
      }

      return res.status(401).json({ message: "Invalid or expired token." });
    }
  };
};

module.exports = roleMiddleware;
