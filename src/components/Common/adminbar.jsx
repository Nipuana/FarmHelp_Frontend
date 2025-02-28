import React, { useState, useEffect } from "react";
import { FaUsers, FaMoneyBillWave, FaHome, FaSignOutAlt, FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../css/Common/adminbar.css"

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Check if the current path is active
  const isActive = (path) => location.pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    navigate("/Landing");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="mobile-toggle_ab" 
        onClick={(e) => {
          e.stopPropagation();
          setIsMobileMenuOpen(!isMobileMenuOpen);
        }}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar_ab ${isMobileMenuOpen ? "mobile-open_ab" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header_ab">
          <h2>Admin Panel</h2>
        </div>
        
        <Link to="/ad_dash" className="sidebar-link_ab">
          <button className={`nav-button_ab ${isActive("/ad_dash") ? "active_ab" : ""}`}>
            <FaHome /> <span>Dashboard</span>
          </button>
        </Link>
        
        <nav className="nav-links_ab">
          <ul>
            {/* CRUD Dropdown */}
            <li 
              className={`crud-dropdown_ab ${isDropdownOpen ? "active_ab" : ""}`} 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Manage Resources</span>
              {isDropdownOpen ? <FaChevronUp className="dropdown-icon_ab" /> : <FaChevronDown className="dropdown-icon_ab" />}
            </li>

            <ul className={`crud-menu_ab ${isDropdownOpen ? "open_ab" : ""}`}>
              <li>
                <Link to="/CRUD1" className={`${isActive("/CRUD1") ? "active-link_ab" : ""}`}>
                  <FaUsers className="menu-icon_ab" /> Users
                </Link>
              </li>
              <li>
                <Link to="/CRUD2" className={`${isActive("/CRUD2") ? "active-link_ab" : ""}`}>
                  <FaMoneyBillWave className="menu-icon_ab" /> Categories
                </Link>
              </li>
              <li>
                <Link to="/CRUD3" className={`${isActive("/CRUD3") ? "active-link_ab" : ""}`}>
                  <FaMoneyBillWave className="menu-icon_ab" /> Products
                </Link>
              </li>
              <li>
                <Link to="/CRUD4" className={`${isActive("/CRUD4") ? "active-link_ab" : ""}`}>
                  <FaMoneyBillWave className="menu-icon_ab" /> Orders
                </Link>
              </li>
            </ul>
          </ul>
        </nav>

        <div className="sidebar-footer_ab">
          <button className="logout-btn_ab" onClick={() => setShowLogoutPopup(true)}>
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutPopup && (
        <div className="modal-overlay_ab" onClick={() => setShowLogoutPopup(false)}>
          <div className="modal-content_ab" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout from your admin account?</p>
            <div className="modal-buttons_ab">
              <button className="cancel-btn_ab" onClick={() => setShowLogoutPopup(false)}>Cancel</button>
              <button className="confirm-btn_ab" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;