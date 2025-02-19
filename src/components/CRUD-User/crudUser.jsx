import React, { useState, useEffect } from "react";
import API from "../../API/api"; // API file for backend calls
import "../../css/CrudUserCss/crudUser.css";
import { FaEdit, FaTrash, FaSave, FaSearch, FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showAddUser, setShowAddUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility toggle
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
    }); // Only allow editing of username, email, and isAdmin, keeping the ID unchanged.
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

  return (
    <div className="user-container_user">
      <h1 className="us1">Users</h1>

      <div className="header-section_user">
        <button className="add-user-btn_user" onClick={() => setShowAddUser(!showAddUser)}>
          <FaUserPlus /> ADD NEW USER
        </button>

        <div className="search-bar_user">
          <input
            type="text"
            placeholder="Search with ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon_user" />
        </div>
      </div>

      {/* Add User Form */}
      {showAddUser && (
        <div className="add-user-form_user">
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <div className="password-input_user">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <button type="button" className="toggle-password_user" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye/> : <FaEyeSlash/>}
            </button>
          </div>
          <label>
            Admin:
            <input
              type="checkbox"
              checked={newUser.isAdmin}
              onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })}
            />
          </label>
          <button className="save-btn_user" onClick={handleAddUser}>
            <FaSave /> Save
          </button>
        </div>
      )}

      <div className="user-table_user">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>isAdmin</th>
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
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          />
        ) : (
          user.email
        )}
      </td>
      <td>
        <input
          type="checkbox"
          checked={editingUserId === user.id ? editData.isAdmin : user.isAdmin}
          onChange={(e) => setEditData({ ...editData, isAdmin: e.target.checked })}
          disabled={editingUserId !== user.id}
        />
      </td>
      <td>
        {editingUserId === user.id ? (
          <button className="save-btn_user" onClick={handleUpdateUser}>
            <FaSave />
          </button>
        ) : (
          <>
            <button className="edit-btn_user" onClick={() => handleEdit(user)}>
              <FaEdit />
            </button>
            <button className="delete-btn_user" onClick={() => handleDeleteUser(user.id)}>
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
      <div className="pagination_user">
        {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active_user" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
