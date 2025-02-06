const jwt = require("jsonwebtoken");

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;  // Attach user to request object

      // Check if user role matches the required roles
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();  // User has valid role, proceed to next middleware
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  };
};

module.exports = roleMiddleware;
