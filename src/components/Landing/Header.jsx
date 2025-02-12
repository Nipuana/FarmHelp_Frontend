import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/LandingCss/Header.css";
import logo from "../../images/logo.png";
import { FaUserCircle } from "react-icons/fa"; // User icon

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken) {
      setToken(storedToken);
      setUsername(storedUsername);
    }
  }, []);

  // Handle click outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
    navigate("/Landing");
  };

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo-section">
        <Link to="/">
          <img src={logo} alt="Logo" className="home_logo" />
        </Link>
      </div>

      {/* Middle Section: Navbar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/product">Products</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/faqs">FAQs</Link></li>
        </ul>
      </nav>

      {/* Right Section: Auth Buttons OR User Profile */}
      <div className="auth-section">
        {token ? (
          <div className={`user-profile ${showDropdown ? "show-dropdown" : ""}`} ref={dropdownRef}>
            <div className="user-info" onClick={() => setShowDropdown(!showDropdown)}>
              <FaUserCircle className="user-icon" />
            </div>

            {/* Dropdown Menu for User */}
            {showDropdown && (
              <div className="user-dropdown">
                <ul>
                  <li><Link to="/change-password">Change Password</Link></li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/Login" className="login-button">Login</Link>
            <Link to="/Register" className="register-button">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
