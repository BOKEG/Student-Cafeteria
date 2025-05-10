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

  // Get the logged-in user's info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

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

  // Add to cart function
  const handleAddToCart = (item) => {
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

  // Place order function
  const handlePlaceOrder = async (orderItems) => {
    if (orderItems.length === 0) {
      alert("Your cart is empty. Please add items to place an order.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
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
      setCart([]);
    } catch (error) {
      setError("Failed to place order. Please try again.");
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter menu items by category
  const filteredMenuItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="menu-container">
      <h1>Menu</h1>

      {/* Profile summary for logged-in student */}
      <div className="profile-summary">
        <p>Welcome, <strong>{user?.name}</strong></p>
        <p>Email: {user?.email}</p>
        <button
          onClick={() => window.location.href = "/profile"} // Navigate to Profile page
          className="profile-button"
        >
          View Profile & Orders
        </button>
      </div>

      {/* Display any errors */}
      {error && <p className="error-message">{error}</p>}

      {/* Show loading or menu items */}
      {loading ? (
        <p>Loading menu items...</p>
      ) : (
        <>
          {/* Category filter buttons */}
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

          {/* Display menu items in selected category */}
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

      {/* Cart component with place order button */}
      <Cart cart={cart} onPlaceOrder={handlePlaceOrder} />
    </div>
  );
};

export default Menu;
