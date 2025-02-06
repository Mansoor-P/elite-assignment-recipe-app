const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get token from the headers (x-auth-token or Authorization header)
  const token = req.header("x-auth-token") || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
