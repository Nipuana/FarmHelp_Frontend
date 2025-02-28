import React, { useState, useEffect } from "react";
import API from "../../API/api";
import "../../css/OrderCss/orderPage.css";
import { FaTimes, FaStar } from "react-icons/fa";
import err_img from "../../images/failed_product.png";
import load_gif from "../../images/Loading.gif";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]); // ✅ Store existing reviews
  const [sortedOrders, setSortedOrders] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [Comment, setComment] = useState("");
  const [Rating, setRating] = useState(0);

  useEffect(() => {
    fetchOrders();
    fetchOrderProducts();
    fetchProducts();
    fetchReviews(); // ✅ Fetch existing reviews
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

  const fetchReviews = async () => {
    try {
      const response = await API.getAllReviews();
      setReviews(response.data); // ✅ Store all existing reviews
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to fetch reviews.");
    }
  };

  const getProductDetails = (productId) => {
    const product = products.find(p => p.id === productId);
    return {
      productName: product ? product.productname : "Unknown Product",
      productImage: product ? `http://localhost:5000/uploads/${product.productImage}` : "/default-image.png"
    };
  };

  const getUserReview = (orderProductId) => {
    return reviews.find(review => review.orderProductId === orderProductId);
  };

  const openReviewModal = (product) => {
    setSelectedProduct({ ...product, orderProductId: product.id });
    setComment("");
    setRating(0);
    setReviewModal(true);
  };

  const closeReviewModal = () => {
    setReviewModal(false);
    setSelectedProduct(null);
  };

  const handleReviewSubmit = async () => {
    if (!Comment.trim() || Rating === 0) {
      alert("Please provide a review and select a rating.");
      return;
    }

    try {
      const newReview = {
        productId: selectedProduct.productId,
        orderProductId: selectedProduct.orderProductId,
        userId: Number(localStorage.getItem("userId")),
        Rating,
        Comment
      };

      await API.createReview(newReview);

      alert("Review submitted successfully!");
      setReviews(prevReviews => [...prevReviews, newReview]); // ✅ Add the review to state
      closeReviewModal();
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="order-page-container">
      <h1 className="order-title">My Orders</h1>

      {error && <div className="error-message">{error}</div>}

      {!loading && orders.length > 0 && (
        <div className="sorting-controls">
          <span className="sort-label">Sort by:</span>
          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Order ID</option>
            <option value="status">Status</option>
          </select>
        </div>
      )}

      {loading ? <p className="loading-text">
        <img src={load_gif} alt="loading" />
        </p>: (
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

                  <div className="order-products">
                    {productsInOrder.length > 0 ? (
                      productsInOrder.map((product, index) => {
                        const { productName, productImage } = getProductDetails(product.productId);
                        const userReview = getUserReview(product.id); // ✅ Check review by orderProductId

                        return (
                          <div key={index} className="product-item">
                            <img src={productImage} alt={productName} className="product-image" />
                            <div className="product-details">
                              <p><strong>{productName}</strong></p>
                              <p>Quantity: {product.quantity}</p>

                              {order.status === "delivered" && (
                                userReview ? (
                                  <div className="user-review">
                                    <p><strong>Your Review:</strong> {userReview.Comment}</p>
                                    <div className="review-rating">
                                      {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < userReview.Rating ? "star filled" : "star"} />
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <button className="review-btn" onClick={() => openReviewModal(product)}>Review</button>
                                )
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No products in this order.</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {reviewModal && (
        <div className="review-modal">
          <div className="review-modal-content">
            <h2>Review {selectedProduct && getProductDetails(selectedProduct.productId).productName}</h2>
            <textarea placeholder="Write your review..." value={Comment} onChange={(e) => setComment(e.target.value)} />

            <div className="rating-container">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar key={star} className={`rating-star ${star <= Rating ? "selected" : ""}`} onClick={() => setRating(star)} />
              ))}
            </div>

            <button onClick={handleReviewSubmit}>Submit Review</button>
            <button onClick={closeReviewModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
