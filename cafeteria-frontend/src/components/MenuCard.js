import React from "react";

const MenuCard = ({ item }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default MenuCard;