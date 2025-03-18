import React, { useState } from "react";

const Cart = ({ cart, onPlaceOrder }) => {
  const [quantities, setQuantities] = useState({}); // State to manage quantities

  // Handle quantity change for a specific item
  const handleQuantityChange = (menuItemId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [menuItemId]: quantity,
    }));
  };

  // Prepare the cart items with quantities for the order
  const prepareOrderItems = () => {
    return cart.map((item) => ({
      menuItemId: item._id, // Use the menu item's ID
      quantity: quantities[item._id] || 1, // Default to 1 if quantity is not set
    }));
  };

  // Handle place order button click
  const handlePlaceOrder = () => {
    const orderItems = prepareOrderItems();
    onPlaceOrder(orderItems); // Pass the order items to the parent component
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              {item.name} - ${item.price}
              <input
                type="number"
                min="1"
                value={quantities[item._id] || 1}
                onChange={(e) =>
                  handleQuantityChange(item._id, parseInt(e.target.value))
                }
              />
            </li>
          ))}
        </ul>
      )}
      <button onClick={handlePlaceOrder} disabled={cart.length === 0}>
        Place Order
      </button>
    </div>
  );
};

export default Cart;