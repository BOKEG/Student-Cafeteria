const express = require("express");
const { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } = require("../controllers/menuController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.post("/", protect, adminOnly, addMenuItem);  // Add a new menu item (Admin only)
router.get("/", getMenuItems);                      // Get all menu items (Public)
router.put("/:id", protect, adminOnly, updateMenuItem); // Update a menu item (Admin only)
router.delete("/:id", protect, adminOnly, deleteMenuItem); // Delete a menu item (Admin only)

module.exports = router;
