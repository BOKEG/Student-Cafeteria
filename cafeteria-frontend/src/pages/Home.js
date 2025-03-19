import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to the Student Cafeteria App 🍽️</h1>
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

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Use Our Cafeteria App?</h2>
        <div className="features-grid">
          <div className="feature-box">
            <h3>📋 Easy Ordering</h3>
            <p>Browse the menu and order your favorite meals with just a few clicks.</p>
          </div>
          <div className="feature-box">
            <h3>⏳ Save Time</h3>
            <p>Avoid long cafeteria lines—order ahead and pick up when ready.</p>
          </div>
          <div className="feature-box">
            <h3>💳 Secure Payments</h3>
            <p>Pay safely online with multiple payment options.</p>
          </div>
          <div className="feature-box">
            <h3>🔔 Real-Time Notifications</h3>
            <p>Get notified when your order is ready for pickup.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
