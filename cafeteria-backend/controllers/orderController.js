import Order from "../models/order.js";
import MenuItem from "../models/menu.js";

/**
 * @desc Place an Order
 * @route POST /api/orders
 * @access Protected (Student)
 */
export const placeOrder = async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "No items provided for the order" });
  }

  try {
    const menuItems = await Promise.all(
      items.map((item) => MenuItem.findById(item.menuItemId))
    );

    let totalAmount = 0;
    let orderItems = [];

    for (let index = 0; index < items.length; index++) {
      const menuItem = menuItems[index];
      const { quantity } = items[index];

      if (!menuItem) {
        return res.status(404).json({ message: `Menu item with ID ${items[index].menuItemId} not found` });
      }

      if (!quantity || quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }

      totalAmount += menuItem.price * quantity;
      orderItems.push({ menuItemId: menuItem._id, quantity });
    }

    const order = new Order({
      studentId: req.user._id || req.user.id,
      items: orderItems,
      totalAmount,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};

/**
 * @desc Get all orders (Admin only)
 * @route GET /api/orders
 * @access Protected (Admin)
 */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("studentId", "name email")
      .populate("items.menuItemId", "name price");

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

/**
 * @desc Get logged-in student's orders
 * @route GET /api/orders/myorders
 * @access Protected (Student)
 */
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ studentId: req.user._id || req.user.id })
      .populate("items.menuItemId", "name price");

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Error fetching user orders", error: error.message });
  }
};

/**
 * @desc Update order status (Admin only)
 * @route PUT /api/orders/:id
 * @access Protected (Admin)
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const newStatus = req.body.status;
    const allowedStatuses = ["pending", "preparing", "ready"];
    if (newStatus && !allowedStatuses.includes(newStatus)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    order.status = newStatus || order.status;
    await order.save();

    // Emit event via Socket.IO
    const io = req.app.get('io');
    io.to(order.studentId.toString()).emit("orderStatusUpdated", {
      orderId: order._id,
      status: order.status,
    });

    res.json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};


/**
 * @desc Delete an order (Admin only)
 * @route DELETE /api/orders/:id
 * @access Protected (Admin)
 */
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
};
