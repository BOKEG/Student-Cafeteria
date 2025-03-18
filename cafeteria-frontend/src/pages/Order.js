import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [items, setItems] = useState([]); // Selected items for the order
  const [menuItems, setMenuItems] = useState([]); // List of menu items
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message
  const navigate = useNavigate();

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/menu`);
        setMenuItems(response.data);
      } catch (error) {
        setError("Failed to fetch menu items");
      }
    };
    fetchMenu();
  }, []);

  // Add an item to the order
  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  // Remove an item from the order
  const handleRemoveItem = (itemId) => {
    setItems(items.filter((item) => item._id !== itemId));
  };

  // Place the order
  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      setError("Please add at least one item to place an order");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/menu`,
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Order placed successfully!");
      navigate("/orders"); // Redirect to the orders page
    } catch (error) {
      setError("Failed to place order. Please try again.");
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Place Order</h1>

      {/* Display error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Menu items */}
      <h2>Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item._id}>
            {item.name} - ${item.price}
            <button onClick={() => handleAddItem(item)}>Add to Order</button>
          </li>
        ))}
      </ul>

      {/* Selected items */}
      <h2>Your Order</h2>
      {items.length === 0 ? (
        <p>No items selected</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              {item.name} - ${item.price}
              <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      {/* Place order button */}
      <button onClick={handlePlaceOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Order;