import React from 'react';
import '../../css/Common/adminbar.css';
import { FaUsers, FaMoneyBillWave, FaHome, FaSignOutAlt } from "react-icons/fa";
import {Link} from "react-router-dom";

function Sidebar() {
  return (
    <>
    {/* Sidebar */}
    <aside className="sidebar">
              <button className="back-btn">
                <FaHome /> Back To Home
              </button>
              <nav className="nav-links">
                <ul>
                  <li>Users CRUD</li>
                  <li>Categories CRUD</li>
                  <li>Products CRUD</li>
                  <li>Orders CRUD</li>
                  <li>Reviews CRUD</li>
                </ul>
              </nav>
              <button className="logout-btn">
                <FaSignOutAlt /> Logout Admin
              </button>
            </aside>
      
    </>
  );
}

export default Sidebar;