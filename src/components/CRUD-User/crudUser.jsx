import React, { useState, useEffect } from "react";
import API from "../../API/api";
import { FaEdit, FaTrash, FaSave, FaSearch, FaUserPlus, FaEye, FaEyeSlash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../css/CrudUserCss/crudUser.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showAddUser, setShowAddUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    isAdmin: false,
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.getUsers();
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditData({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  };

  const handleUpdateUser = async () => {
    if (window.confirm("Are you sure you want to save these changes?")) {
      try {
        await API.updateUser(editingUserId, editData);
        setEditingUserId(null);
        fetchUsers();
      } catch (err) {
        console.error("Error updating user", err);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await API.deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user", err);
      }
    }
  };

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      alert("Username, Email, and Password are required.");
      return;
    }

    if (window.confirm("Are you sure you want to add this user?")) {
      try {
        await API.registerUser(newUser);
        setShowAddUser(false);
        setNewUser({
          username: "",
          email: "",
          isAdmin: false,
          password: "",
        });
        fetchUsers();
      } catch (err) {
        console.error("Error adding user", err);
      }
    }
  };

  const getFilteredUsers = () => {
    return users
      .filter((user) => user.id.toString().includes(searchQuery))
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  };

  const filteredUsers = users.filter(user => user.id.toString().includes(searchQuery));
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="user-container">
      <h1 className="user-title">User Management</h1>

      <div className="header-section_usc">
        <button 
          className="btn btn-primary add-user-btn" 
          onClick={() => setShowAddUser(!showAddUser)}
        >
          <FaUserPlus /> {showAddUser ? "HIDE FORM" : "ADD NEW USER"}
        </button>

        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      {/* Add User Form */}
      {showAddUser && (
        <div className="add-user-form">
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="isAdmin"
                checked={newUser.isAdmin}
                onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })}
              />
              <label htmlFor="isAdmin">Admin User</label>
            </div>
            <button className="btn btn-primary" onClick={handleAddUser}>
              <FaSave /> Save User
            </button>
          </div>
        </div>
      )}

      <div className="user-table">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredUsers().map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      className="form-input"
                      value={editData.username}
                      onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <input
                      type="email"
                      className="form-input"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      checked={editingUserId === user.id ? editData.isAdmin : user.isAdmin}
                      onChange={(e) => setEditData({ ...editData, isAdmin: e.target.checked })}
                      disabled={editingUserId !== user.id}
                    />
                  </div>
                </td>
                <td className="actions-cell">
                  {editingUserId === user.id ? (
                    <button className="btn btn-success" onClick={handleUpdateUser}>
                      <FaSave />
                    </button>
                  ) : (
                    <>
                      <button className="btn btn-edit" onClick={() => handleEdit(user)}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="pagination">
          <button 
            className="nav-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          
          <button 
            className="nav-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTable;