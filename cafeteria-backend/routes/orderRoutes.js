import express from "express";
import {
  placeOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const orderRoutes = (io) => {
  const router = express.Router();

  // Middleware: Attach `io` to req.app so controllers can access it
  router.use((req, res, next) => {
    req.app.set("io", io);
    next();
  });

  // Student places an order
  router.post("/", protect, placeOrder);

  // Admin gets all orders
  router.get("/", protect, adminOnly, getOrders);

  // Student gets their own orders
  router.get("/myorders", protect, getUserOrders);

  // Admin updates order status
  router.put("/:id", protect, adminOnly, updateOrderStatus);

  // Admin deletes an order
  router.delete("/:id", protect, adminOnly, deleteOrder);

  return router;
};

export default orderRoutes;
