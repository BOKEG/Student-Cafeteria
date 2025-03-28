import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Get user profile (protected route)
router.get("/profile", protect, getUserProfile);

export default router; // ✅ Use default export

