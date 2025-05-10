import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuCard from "../components/MenuCard";
import Cart from "../components/Cart";
import "./Menu.css"; 

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("breakfast");

  // ✅ Safely get user from localStorage (prevents JSON parse error)
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/menu`
        );
        setMenuItems(response.data);
      } catch (error) {
        setError("Failed to fetch menu items. Please try again later.");
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Add to cart function (global cart across categories)
  const handleAddToCart = (item) => {
    // If item already exists, increase its quantity
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    alert(`${item.name} added to cart!`);
  };

  // Order placement function accepts orderItems prepared by Cart.js
  const handlePlaceOrder = async (orderItems) => {
    if (orderItems.length === 0) {
      alert("Your cart is empty. Please add items to place an order.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      // Send the orderItems directly as payload
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
        { items: orderItems },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("Order placed successfully!");
      setCart([]); // Clear the cart after successful order placement
    } catch (error) {
      setError("Failed to place order. Please try again.");
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter items by selected category
  const filteredMenuItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="menu-container">
      <h1>Menu</h1>
      {/* Show user info if available */}
      {user && (
        <div style={{ marginBottom: "1rem" }}>
          <strong>Welcome, {user.name}</strong> <br />
          <small>Email: {user.email}</small>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading menu items...</p>
      ) : (
        <>
          <div className="category-tabs">
            {["breakfast", "lunch", "snacks", "beverages"].map((category) => (
              <button
                key={category}
                className={`tab-button ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <div className="menu-items">
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map((item) => (
                <MenuCard
                  key={item._id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p>No items available in this category.</p>
            )}
          </div>
        </>
      )}
      {/* Pass the global cart and the new order placement function */}
      <Cart cart={cart} onPlaceOrder={handlePlaceOrder} />
    </div>
  );
};

export default Menu;
