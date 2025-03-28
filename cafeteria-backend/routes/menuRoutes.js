import express from "express";
import { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } from "../controllers/menuController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/", protect, adminOnly, addMenuItem);  // Add a new menu item (Admin only)
router.get("/", getMenuItems);                      // Get all menu items (Public)
router.put("/:id", protect, adminOnly, updateMenuItem); // Update a menu item (Admin only)
router.delete("/:id", protect, adminOnly, deleteMenuItem); // Delete a menu item (Admin only)

export default router;
