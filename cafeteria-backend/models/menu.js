const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["breakfast", "lunch", "snacks", "beverages"],
      required: true,
    },
    image: {
      type: String,
      default: "https://example.com/default-food-image.jpg", // Placeholder image
    },
    available: { type: Boolean, default: true }, // Availability status
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("menu", menuSchema);
