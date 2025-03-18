import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
      </nav>
      <div className="hero-section">
      <img
          src="https://media.istockphoto.com/id/526239615/photo/group-of-students-in-cafeteria.jpg?s=612x612&w=0&k=20&c=KITdMR0BvlVfWrbSTjhS-tUS4rAE-SpSL8X3fsDrGJM="
          alt="Cafeteria"
          className="hero-image"
        />

        <h1>Welcome to the Student Cafeteria App</h1>
        <p>Order your favorite meals from the comfort of your dorm!</p>
        <div className="cta-buttons">
          <Link to="/register">
            <button className="cta-button">Register</button>
          </Link>
          <Link to="/login">
            <button className="cta-button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;