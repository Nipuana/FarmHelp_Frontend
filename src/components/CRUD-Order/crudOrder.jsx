import React, { useState, useEffect } from "react";
import API from "../../API/api"; // API file for backend calls
import "../../css/CrudOrderCss/crudOrder.css";
import { FaSearch } from "react-icons/fa";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchOrders();
    fetchOrderProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.getAllOrders();
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const fetchOrderProducts = async () => {
    try {
      const response = await API.getAllOrderProducts();
      setOrderProducts(response.data);
    } catch (err) {
      console.error("Error fetching order products", err);
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
              <th>Products</th>
              <th>Total Price</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredOrders().map((order) => {
              // Get products related to this order
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
                            {op.Product?.productName
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
