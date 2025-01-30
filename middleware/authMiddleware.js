const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

const authenticateUser = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied. No valid token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Attach decoded user info to request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Access Denied. Admins only." });
  }
  next();
};

module.exports = { authenticateUser, authorizeAdmin };
