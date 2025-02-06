const jwt = require("jsonwebtoken");

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // Get token from the headers (x-auth-token)
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
      // Verify the token with the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the decoded user information to the request object
      req.user = decoded;

      // Check if user role is in the allowed roles
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next(); // User has valid role, proceed to next middleware
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  };
};

module.exports = roleMiddleware;
