import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuCard from "../components/MenuCard";
import Cart from "../components/Cart";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/menu`);
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();
  }, []);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.name} added to cart!`);
  };

  // Place the order
  const handlePlaceOrder = async (orderItems) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
        { items: orderItems }, // Send the order items with menuItemId and quantity
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Order placed successfully!");
      setCart([]); // Clear the cart
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div>
      <h1>Menu</h1>
      <div>
        {menuItems.map((item) => (
          <MenuCard key={item._id} item={item} onAddToCart={handleAddToCart} />
        ))}
      </div>
      <Cart cart={cart} onPlaceOrder={handlePlaceOrder} />
    </div>
  );
};

export default Menu;