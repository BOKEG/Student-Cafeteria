import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Menu</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;