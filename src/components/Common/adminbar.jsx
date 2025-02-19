import React, { useState } from "react";
import "../../css/Common/adminbar.css";
import { FaUsers, FaMoneyBillWave, FaHome, FaSignOutAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    navigate("/Landing");
  };

  return (
    <>
      {/* Sidebar */}
      <aside className="sidebar">
        <Link to="/ad_dash" className="rem_und">
          <button className="back-btn">
            <FaHome /> Back To Home
          </button>
        </Link>
        
        <nav className="nav-links">
          <ul>
            {/* CRUD Dropdown */}
            <li className="crud-dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              CRUD 
              {isDropdownOpen ? <FaChevronUp className="dropdown-icon" /> : <FaChevronDown className="dropdown-icon" />}
            </li>

            <ul className={`crud-menu ${isDropdownOpen ? "open" : ""}`}>
              <li>
                <Link to="/CRUD1">Users CRUD</Link>
              </li>
              <li>
                <Link to="/CRUD2">Categories CRUD</Link>
              </li>
              <li>
                <Link to="/CRUD3">Products CRUD</Link>
              </li>
              <li>
                <Link to="/CRUD4">Orders CRUD</Link>
              </li>
              <li>
                <Link to="/CRUD5">Reviews CRUD</Link>
              </li>
            </ul>
          </ul>
        </nav>

        <button className="logout-btn" onClick={() => setShowLogoutPopup(true)}>
          <FaSignOutAlt /> Logout Admin
        </button>
      </aside>

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
}

export default Sidebar;
