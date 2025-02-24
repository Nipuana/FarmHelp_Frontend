import React, { useState, useEffect } from "react";
import API from "../../API/api";
import "../../css/OrderCss/orderPage.css";
import { FaTimes } from "react-icons/fa";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [sortedOrders, setSortedOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
    fetchOrderProducts();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (orders.length === 0) {
      setSortedOrders([]);
      return;
    }

    let sorted = [...orders];
    if (sortBy === "status") {
      const statusOrder = { pending: 1, shipped: 2, delivered: 3, canceled: 4 };
      sorted.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    } else if (sortBy === "id") {
      sorted.sort((a, b) => a.id - b.id);
    }

    setSortedOrders(sorted);
  }, [orders, sortBy]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User not logged in. Please log in to view orders.");
        setLoading(false);
        return;
      }

      const response = await API.getAllOrders();
      const userOrders = response.data.filter(order => order.userId === Number(userId));
      setOrders(userOrders);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again later.");
      setLoading(false);
    }
  };

  const fetchOrderProducts = async () => {
    try {
      const response = await API.getAllOrderProducts();
      setOrderProducts(response.data);
    } catch (err) {
      console.error("Error fetching order products:", err);
      setError("Failed to fetch order products.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await API.getAllProducts();
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products.");
    }
  };

  const getProductDetails = (productId) => {
    const product = products.find(p => p.id === productId);
    return {
      productName: product ? product.productname : "Unknown Product",
      productImage: product ? `http://localhost:5000/uploads/${product.productImage}` : "/default-image.png"
    };
  };

  const handleCancelOrder = async (orderId) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this order?");
    if (!isConfirmed) return;

    try {
      await API.updateOrder(orderId, { status: "canceled" });

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: "canceled" } : order
        )
      );
      alert("Your order has been canceled.");
    } catch (err) {
      console.error("Error canceling order:", err);
      alert("Failed to cancel order. Please try again.");
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="order-page-container">
      <h1 className="order-title">My Orders</h1>

      {error && <div className="error-message">{error}</div>}

      {!loading && orders.length > 0 && (
        <div className="sorting-controls">
          <span className="sort-label">Sort by:</span>
          <select className="sort-select" value={sortBy} onChange={handleSortChange}>
            <option value="id">Order ID</option>
            <option value="status">Status</option>
          </select>
        </div>
      )}

      {loading ? <p className="loading-text">Loading orders...</p> : (
        <div className="order-list">
          {sortedOrders.length === 0 ? (
            <p className="no-orders">You have not placed any orders yet.</p>
          ) : (
            sortedOrders.map(order => {
              const productsInOrder = orderProducts.filter(product => product.orderId === order.id);
              return (
                <div key={order.id} className="order-card">
                  <h2>Order ID: {order.id}</h2>
                  <p><strong>Total Price:</strong> ${order.price}</p>
                  <p><strong>Delivery Address:</strong> {order.address}</p>
                  <p><strong>Status:</strong> <span className={`status-${order.status}`}>{order.status}</span></p>

                  {/* Product Details */}
                  <div className="order-products">
                    {productsInOrder.length > 0 ? (
                      productsInOrder.map((product, index) => {
                        const { productName, productImage } = getProductDetails(product.productId);
                        return (
                          <div key={index} className="product-item">
                            <img
                              src={productImage}
                              alt={productName}
                              className="product-image"
                            />
                            <div className="product-details">
                              <p><strong>{productName}</strong></p>
                              <p>Quantity: {product.quantity}</p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No products in this order.</p>
                    )}
                  </div>

                  {order.status === "pending" && (
                    <button className="cancel-order-btn" onClick={() => handleCancelOrder(order.id)}>
                      <FaTimes /> Cancel Order
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
