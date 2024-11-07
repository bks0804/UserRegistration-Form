const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// JWT Authentication middleware
exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store the decoded token in the request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

// Admin check middleware
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
