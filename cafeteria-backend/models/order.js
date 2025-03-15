const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "menu", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "preparing", "ready"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("order", orderSchema);