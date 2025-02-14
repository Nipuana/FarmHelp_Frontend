import React from "react";
import "../../css/AdminCss/adminDashboardBody.css";
import { Users, Settings, BarChart2 } from "lucide-react";

const AdminPanel = () => {
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-item">
            <Users className="icon" /> Users
          </li>
          <li className="menu-item">
            <BarChart2 className="icon" /> Analytics
          </li>
          <li className="menu-item">
            <Settings className="icon" /> Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* Cards */}
        <div className="card-container">
          <div className="card">
            <h3>Total Users</h3>
            <p>1,245</p>
          </div>
          <div className="card">
            <h3>Active Sessions</h3>
            <p>243</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>$12,540</p>
          </div>
        </div>

        {/* User Table */}
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>johndoe@example.com</td>
              <td>Admin</td>
              <td>
                <button className="btn btn-outline">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
            {/* More rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
