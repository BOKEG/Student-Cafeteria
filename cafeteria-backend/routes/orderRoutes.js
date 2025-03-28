import express from "express";
import {
  placeOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js"; // Ensure the controller file also uses ES module syntax

import { protect, adminOnly } from "../middleware/authMiddleware.js"; // Ensure this file also uses ES modules

const orderRoutes = (io) => {
  const router = express.Router();

  // Student places an order
  router.post("/", protect, placeOrder);

  // Admin gets all orders
  router.get("/", protect, adminOnly, getOrders);

  // Student gets their own orders
  router.get("/myorders", protect, getUserOrders);

  // Admin updates order status
  router.put("/:id", protect, adminOnly, (req, res) => updateOrderStatus(req, res, io));

  // Admin deletes an order
  router.delete("/:id", protect, adminOnly, deleteOrder);

  return router;
};

export default orderRoutes; // Change module.exports to export default
