import React from 'react';
import Body from "./adminDashboardBody";
import '../../css/AdminCss/adminDashboard.css';
import { FaUsers, FaMoneyBillWave, FaHome, FaSignOutAlt } from "react-icons/fa";

function AdminDash() {
  return (
    <div className="AdminLogin">
      <p className='filler_dbb' >a</p>
          {/* Sidebar */}
            <aside className="sidebar">
              <button className="back-btn">
                <FaHome /> Back To Home
              </button>
              <nav className="nav-links">
                <ul>
                  <li>Users CRUD</li>
                  <li>Products CRUD</li>
                  <li>Reviews CRUD</li>
                  <li>Orders CRUD</li>
                  <li>Categories CRUD</li>
                </ul>
              </nav>
              <button className="logout-btn">
                <FaSignOutAlt /> Logout Admin
              </button>
            </aside>
      <Body/>
      
    </div>
  );
}

export default AdminDash;