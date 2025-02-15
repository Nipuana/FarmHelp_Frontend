import React from "react";
import { FaUsers, FaMoneyBillWave, FaHome, FaSignOutAlt } from "react-icons/fa";
import "../../css/AdminCss/AdminDashboardBody.css"; // Import CSS file
import {Link} from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
  

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Admin Panel</h1>

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stats-box">
            <FaUsers className="stats-icon green-icon" />
            <div>
              <p>Total Users</p>
              <h2>---</h2>
            </div>
          </div>
          <div className="stats-box">
            <FaMoneyBillWave className="stats-icon purple-icon" />
            <div>
              <p>Total Sales</p>
              <h2>---</h2>
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="orders-container">
          <h2>Pending Orders</h2>
          <p className="orders-subtitle">These are the orders that customers have placed and are processing</p>
          <div className="warning-box">
            ⚠️ These are the orders that are left to be processed
          </div>

          {/* Orders Table */}
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Delivery Location</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 9 }).map((_, index) => (
                <tr key={index}>
                  <td>Order {index + 1}</td>
                  <td>something</td>
                  <td>{Math.floor(Math.random() * 100)}</td>
                  <td>Some Location</td>
                  <td>Pending</td>
                  <td>
                    <button className="btn in-process">🚢 Shipped</button>
                    <button className="btn delivered">🚚 Delivered</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn">&laquo;</button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button key={num} className={`page-btn ${num === 2 ? "active" : ""}`}>
                {num}
              </button>
            ))}
            <button className="page-btn">&raquo;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
