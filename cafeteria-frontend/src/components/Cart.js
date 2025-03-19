import React, { useState } from "react";
import "./Cart.css";

const Cart = ({ cart, onPlaceOrder }) => {
  const [quantities, setQuantities] = useState({});

  // Update quantity for an item
  const handleQuantityChange = (menuItemId, quantity) => {
    if (quantity < 1) quantity = 1;
    setQuantities((prev) => ({ ...prev, [menuItemId]: quantity }));
  };

  // Prepare order items; now also passing category (optional)
  const prepareOrderItems = () => {
    return cart.map((item) => ({
      menuItemId: item._id, // The backend expects this field
      quantity: quantities[item._id] || 1,
      // Optional: include the category for traceability
      category: item.category, 
    }));
  };

  // When "Place Order" is clicked, call parent's order function
  const handlePlaceOrder = () => {
    const orderItems = prepareOrderItems();
    console.log("Order Items Prepared:", orderItems); // Labeled log for debugging
    onPlaceOrder(orderItems);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item._id} className="cart-item">
              <span>
                {item.name} ({item.category}) - ${item.price.toFixed(2)}
              </span>
              <input
                type="number"
                min="1"
                value={quantities[item._id] || 1}
                onChange={(e) =>
                  handleQuantityChange(item._id, parseInt(e.target.value, 10))
                }
                className="quantity-input"
              />
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handlePlaceOrder}
        disabled={cart.length === 0}
        className="place-order-button"
      >
        Place Order
      </button>
    </div>
  );
};

export default Cart;
