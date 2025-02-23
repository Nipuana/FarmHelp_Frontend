import React, { useState, useEffect } from "react";
import API from "../../API/api"; // API file for backend calls
import "../../css/CrudOrderCss/crudOrder.css";
import { FaEdit, FaTrash, FaSave, FaSearch, FaTimes } from "react-icons/fa";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // Status filter
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.getAllOrders();
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrderId(order.id);
    setEditData({
      userId: order.userId, // Foreign Key
      orderQuantity: order.orderQuantity,
      price: order.price,
      address: order.address,
      status: order.status,
    });
  };

  const handleSaveEdit = async () => {
    if (!editData.orderQuantity || !editData.price || !editData.address || !editData.status) {
      alert("All fields are required.");
      return;
    }

    try {
      await API.updateOrder(editingOrderId, editData);
      setEditingOrderId(null);
      fetchOrders();
    } catch (err) {
      console.error("Error updating order", err);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await API.deleteOrder(id);
        fetchOrders();
      } catch (err) {
        console.error("Error deleting order", err);
      }
    }
  };

  const getFilteredOrders = () => {
    return orders.filter(
      (order) =>
        order.id.toString().includes(searchQuery) &&
        (statusFilter === "" || order.status === statusFilter)
    );
  };

  return (
    <div className="order-container">
      <h1 className="order-title">Orders</h1>

      <div className="header-section_order">
        <div className="search-bar_order">
          <input
            type="text"
            placeholder="Search Order ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon_order" />
        </div>

        {/* Status Filter */}
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="status-filter">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Order Table */}
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>User ID</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredOrders().map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userId}</td> {/* Foreign Key */}

                {editingOrderId === order.id ? (
                  <>
                    <td>
                      <input
                        type="number"
                        value={editData.orderQuantity}
                        onChange={(e) => setEditData({ ...editData, orderQuantity: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editData.price}
                        onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editData.address}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      />
                    </td>
                    <td>
                      <select
                        value={editData.status}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="canceled">Canceled</option>
                      </select>
                    </td>
                    <td>
                      <button className="save-btn_order" onClick={handleSaveEdit}>
                        <FaSave />
                      </button>
                      <button className="cancel-btn_order" onClick={() => setEditingOrderId(null)}>
                        <FaTimes />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{order.orderQuantity}</td>
                    <td>${order.price}</td>
                    <td>{order.address}</td>
                    <td>{order.status}</td>
                    <td>
                      <button className="edit-btn_order" onClick={() => handleEditOrder(order)}>
                        <FaEdit />
                      </button>
                      <button className="delete-btn_order" onClick={() => handleDeleteOrder(order.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
