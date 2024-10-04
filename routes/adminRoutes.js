const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUser,
  deleteUser,
  searchUsers,
} = require("../controllers/adminController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

// Protect routes with JWT authentication and admin check
router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.put("/users", updateUser);
router.delete("/users/:id", authMiddleware, isAdmin, deleteUser);
router.get("/users/search", authMiddleware, isAdmin, searchUsers);

module.exports = router;
