// import React from 'react';
import '../../css/LandingCss/Header.css'; // Create this file for styling

const Header = () => {
  return (
    <header className="header">
      {/* Left Section: Logo and Name */}
      <div className="logo-section">
        <img src="/logo.png" alt="FarmHelp Logo" className="logo" />
        <h1 className="site-name">FarmHelp</h1>
      </div>

      {/* Middle Section: Navbar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/product">Product</a></li>
          <li><a href="/rating">Rating</a></li>
          <li><a href="/reviews">Reviews</a></li>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/faqs">FAQs</a></li>
        </ul>
      </nav>

      {/* Right Section: Login and Register Buttons */}
      <div className="auth-buttons">
        <button className="login-button">Login</button>
        <button className="register-button">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;