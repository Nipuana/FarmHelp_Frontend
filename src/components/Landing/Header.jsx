import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/LandingCss/Header.css";
import logo from "../../images/logo.png";
import { FaUserCircle, FaHome, FaBoxOpen, FaShoppingBag, FaInfoCircle, FaQuestionCircle } from "react-icons/fa";

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true"); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true"; 

    if (storedToken) {
      setToken(storedToken);
      setUsername(storedUsername);
      setIsAdmin(storedIsAdmin); 
    }

    // Add scroll listener for header effect
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");
    setToken(null);
    setUsername(null);
    setUserId(null);
    setIsAdmin(false);
    navigate("/Landing");
    setShowLogoutPopup(false);
  };

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        {/* Logo Section */}
        <div className="logo-section">
          <Link to="/">
            <img src={logo} alt="Logo" className="home_logo" />
          </Link>
        </div>

        {/* Middle Section: Navbar (Hidden if No Token) */}
        {token && !isAdmin && (
          <nav className="navbar">
            <ul className="nav-links">
              <li>
                <Link to="/">
                  <FaHome className="nav-icon" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/product">
                  <FaBoxOpen className="nav-icon" />
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link to="/Orders">
                  <FaShoppingBag className="nav-icon" />
                  <span>My Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/about-us">
                  <FaInfoCircle className="nav-icon" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/faqs">
                  <FaQuestionCircle className="nav-icon" />
                  <span>FAQs</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}

        {/* Right Section: Auth Buttons OR User Profile */}
        <div className="auth-section">
          {token ? (
            <div className={`user-profile ${showDropdown ? "show-dropdown" : ""}`} ref={dropdownRef}>
              <div className="user-info" onClick={() => setShowDropdown(!showDropdown)}>
                <span className="username-display">{username}</span>
                <FaUserCircle className="user-icon" />
              </div>

              {/* Dropdown Menu for User */}
              {showDropdown && (
                <div className="user-dropdown">
                  <ul>  
                    {isAdmin && (
                      <Link to="/ad_dash" className="aaa">
                        <li>Admin Panel</li>
                      </Link>
                    )}
                    <Link to="/change-password" className="aaa">
                      <li>Change Password</li>
                    </Link>
                    <li className="aab" onClick={() => setShowLogoutPopup(true)}>Logout</li>
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

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="popup-buttons">
              <button className="confirm-btn" onClick={handleLogout}>Yes</button>
              <button className="cancel-btn" onClick={() => setShowLogoutPopup(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
