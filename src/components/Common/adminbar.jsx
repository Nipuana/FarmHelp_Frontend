import React from "react";
import "../../css/Common/adminbar.css";
import { FaUsers, FaMoneyBillWave, FaHome, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

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
        <Link to="/ad_dash">
          <button className="back-btn">
            <FaHome /> Back To Home
          </button>
        </Link>
        
        <nav className="nav-links">
          <ul>
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
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout Admin
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
