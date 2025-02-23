import React, { useState, useEffect } from "react";
import API from "../../API/api"; // API file for backend calls
import "../../css/CrudOrderCss/crudOrder.css";
import { FaSearch } from "react-icons/fa";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // Status filter

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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
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
            </tr>
          </thead>
          <tbody>
            {getFilteredOrders().map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>{order.orderQuantity}</td>
                <td>${order.price}</td>
                <td>{order.address}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
