const Order = require("../models/order");
const MenuItem = require("../models/menu");

// @desc Place an Order
const placeOrder = async (req, res) => {
  const { items } = req.body; // [{ menuItemId, quantity }]

  try {
    let totalAmount = 0;
    let orderItems = [];

    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) return res.status(404).json({ message: "Menu item not found" });

      totalAmount += menuItem.price * item.quantity;
      orderItems.push({ menuItemId: menuItem._id, quantity: item.quantity });
    }

    const order = new Order({
      studentId: req.user.id,
      items: orderItems,
      totalAmount
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};

// @desc Get all orders (Admin)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("studentId", "name email")
      .populate("items.menuItemId", "name price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// @desc Get logged-in user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ studentId: req.user.id })
      .populate("items.menuItemId", "name price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error: error.message });
  }
};

// @desc Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};

// @desc Delete an order (Admin)
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
};

module.exports = { placeOrder, getOrders, getUserOrders, updateOrderStatus, deleteOrder };
