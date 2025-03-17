const express = require("express");
const {
  placeOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController");

const { protect, adminOnly } = require("../middleware/authMiddleware"); 

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

module.exports = orderRoutes;
