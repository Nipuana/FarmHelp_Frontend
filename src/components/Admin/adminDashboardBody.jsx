import React, { useState, useEffect } from "react";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import API from "../../API/api"; 
import "../../css/AdminCss/AdminDashboardBody.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, filterStatus]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [ordersResponse, usersResponse, orderProductsResponse] = await Promise.all([
        API.getAllOrders(),
        API.getUsers(),
        API.getAllOrderProducts() 
      ]);

      if (ordersResponse.data) {
        setOrders(ordersResponse.data);

        const completedSales = ordersResponse.data
          .filter(order => order.status === "delivered")
          .reduce((total, order) => total + parseFloat(order.price), 0);
        setTotalSales(completedSales);
      }

      if (usersResponse.data) {
        setTotalUsers(usersResponse.data.length);
      }

      if (orderProductsResponse.data) {
        setOrderProducts(orderProductsResponse.data);
      }

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to fetch dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    if (filterStatus === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === filterStatus.toLowerCase()));
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const confirmUpdate = window.confirm(`Are you sure you want to change the order status to "${newStatus}"?`);
    if (!confirmUpdate) return;

    try {
      await API.updateOrder(orderId, { status: newStatus });

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="admin-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Admin Panel</h1>

        {error && <div className="error-message">{error}</div>}
        {loading ? <p className="loading-text">Loading dashboard data...</p> : (
          <>
            <div className="stats-container">
              <div className="stats-box">
                <FaUsers className="stats-icon green-icon" />
                <div>
                  <p>Total Users</p>
                  <h2>{totalUsers}</h2>
                </div>
              </div>
              <div className="stats-box">
                <FaMoneyBillWave className="stats-icon purple-icon" />
                <div>
                  <p>Total Sales</p>
                  <h2>${totalSales.toFixed(2)}</h2>
                </div>
              </div>
            </div>

            <div className="orders-container">
              <h2>Orders</h2>

              {/* Dropdown for filtering orders by status */}
              <div className="filter-section">
                <label htmlFor="status-filter">Filter by Status:</label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-dropdown"
                >
                  <option value="All">All</option>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <p className="orders-subtitle">These orders need action.</p>
              <div className="warning-box">⚠️ Orders awaiting processing</div>

              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User ID</th>
                    <th>Products</th>
                    <th>Total Price</th>
                    <th>Delivery Location</th>
                    <th>Status</th>
                    <th>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="7">No orders found</td>
                    </tr>
                  ) : (
                    filteredOrders.map(order => {
                      const productsInOrder = orderProducts.filter(op => op.orderId === order.id);
                      return (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.userId}</td>
                          <td>
                            {productsInOrder.length > 0 ? (
                              <ul className="product-list">
                                {productsInOrder.map((op, index) => (
                                  <li key={index} className="product-item">
                                    {op.Product && op.Product.productName
                                      ? `${op.Product.productName} (Qty: ${op.quantity})`
                                      : `Unknown Product (Qty: ${op.quantity})`}
                                  </li>
                                ))}
                              </ul>
                            ) : "No products"}
                          </td>
                          <td>${order.price}</td>
                          <td>{order.address}</td>
                          <td>{order.status}</td>
                          <td>
                            <button
                              className="btn pending"
                              onClick={() => updateOrderStatus(order.id, "pending")}
                              disabled={order.status === "pending"}
                            >
                              ⏳ Pending
                            </button>
                            <button
                              className="btn in-process"
                              onClick={() => updateOrderStatus(order.id, "shipped")}
                              disabled={order.status === "shipped"}
                            >
                              🚢 Shipped
                            </button>
                            <button
                              className="btn delivered"
                              onClick={() => updateOrderStatus(order.id, "delivered")}
                              disabled={order.status === "delivered"}
                            >
                              🚚 Delivered
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
