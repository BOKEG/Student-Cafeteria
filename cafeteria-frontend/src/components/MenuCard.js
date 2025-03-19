import React, { useState } from "react";
import "./MenuCard.css";

const MenuCard = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1); // Ensure quantity is at least 1
  };

  const handleAddToCart = () => {
    onAddToCart({ ...item, quantity });
  };

  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} className="menu-image" />
      <h3 className="menu-title">{item.name}</h3>
      <p className="menu-description">{item.description}</p>
      <p className="menu-price">Price: <strong>${item.price.toFixed(2)}</strong></p>

      <div className="menu-actions">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="menu-quantity"
        />
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
