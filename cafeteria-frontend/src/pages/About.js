import React from "react";
import "./About.css"; 

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>Welcome to Our Student Cafeteria</h1>
        <p>
          At <strong>Student Cafeteria</strong>, we believe that **great food fuels great minds**.  
          Our goal is to provide students with **affordable, nutritious, and delicious meals** 
          while ensuring a seamless dining experience.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <h2>🎯 Our Mission</h2>
        <p>
          We are committed to creating a **stress-free cafeteria experience** by:
        </p>
        <ul>
          <li>🍽 **Providing delicious and healthy meal options** for students.</li>
          <li>⏳ **Eliminating long waiting times** with our smart order & pickup system.</li>
          <li>📱 **Offering a user-friendly cafeteria app** for seamless ordering.</li>
          <li>🌱 **Encouraging sustainable practices** by reducing food waste.</li>
          <li>💡 **Enhancing campus dining convenience** through technology.</li>
        </ul>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <h2>🚀 How It Works</h2>
        <p>Ordering your favorite meal is as easy as:</p>
        <ol>
          <li>📖 **Browse the menu** and select your meal.</li>
          <li>🛒 **Place your order** through the app.</li>
          <li>🔔 **Get notified** when your food is ready.</li>
          <li>🎉 **Pick up & enjoy** a hassle-free meal!</li>
        </ol>
      </div>

      {/* Image Section */}
      <div className="about-image">
        <img 
          src="https://www.weareteachers.com/wp-content/uploads/sites/2/2017/10/east-hamilton-cafe-use.jpg"
          alt="Cafeteria" 
        />
      </div>
    </div>
  );
};

export default About;
