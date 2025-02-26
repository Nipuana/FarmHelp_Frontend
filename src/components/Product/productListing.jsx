import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiX, FiFilter } from "react-icons/fi";
import PropTypes from 'prop-types';
import API from "../../API/api";
import "../../css/ProductCss/productListing.css";
import err_img from "../../images/failed_product.png";
import load_gif from "../../images/Loading.gif";

// PropTypes definitions
const ProductType = {
  id: PropTypes.number.isRequired,
  productname: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,  
  productImage: PropTypes.string,
  avgRating: PropTypes.number,
  reviews: PropTypes.array,
  category: PropTypes.string // Added category for filtering
};

// Display average rating as stars
const RatingStars = ({ avgRating }) => (
  <div className="rating-display">
    {avgRating !== null && avgRating !== undefined ? (
      [...Array(5)].map((_, i) => (
        <span key={i} className={i < Math.round(avgRating) ? "star filled" : "star"}>★</span>
      ))
    ) : (
      <p className="no-rating">No rating yet</p>
    )}
  </div>
);

// Hero Section Component
const HeroSection = () => (
  <div className="hero-section">
    <div className="hero-content">
      <h1>Farm Fresh Solutions</h1>
      <p>High-quality farming products to maximize your agricultural success</p>
    </div>
  </div>
);

// Category Sorter Component
const CategorySorter = ({ selectedCategory, onCategoryChange }) => {
  const categories = ["All", "Tools", "Pesticides", "Insecticides", "Machines"];
  
  return (
    <div className="category-sorter">
      <div className="sorter-header">
        <FiFilter />
        <h3>Filter by Category</h3>
      </div>
      <div className="category-options">
        {categories.map(category => (
          <button 
            key={category} 
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

// Display individual review with stars and review text
const ReviewItem = ({ review }) => (
  <div className="review-item">
    <div className="review-rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < review.Rating ? "star filled" : "star"}>★</span>
      ))}
    </div>
    <p className="review-text">{review.Comment}</p>
  </div>
);

// Sub-components
const ProductCard = ({ product, onProductClick, onAddToCart }) => {
  return (
    <div className="product-card" onClick={() => onProductClick(product)}>
      <img
        className="product-image1"
        src={product.productImage ? `http://localhost:5000/uploads/${product.productImage}` : "/default-image.png"}
        alt={product.productname || "Unnamed Product"}
      />
      <div className="product-details">
        <h2>{product.productName || "Unnamed Product"}</h2>
        
        {/* Add category tag */}
        {product.category && <span className="category-tag">{product.category}</span>}

        {/* Display average rating */}
        <RatingStars avgRating={product.avgRating} />

        <div className="product-footer">
          <span className="product_price">NPR{product.price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="add-to-cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Product Details component with separate rating and review sections
const ProductDetails = ({ product, onClose, onAddToCart }) => (
  <div className="product-details-panel">
    <button className="close-details" onClick={onClose}>
      <FiX size={24} />
    </button>
    <div className="details-content">
      <img
        src={product.productImage ? `http://localhost:5000/uploads/${product.productImage}` : "/default-image.png"}
        alt={product.productname}
        className="details-image"
      />
      <h1>{product.productname}</h1>
      {product.category && <span className="category-badge">{product.category}</span>}
      <p className="details-description">{product.description}</p>

      {/* Rating section - shows average rating */}
      <div className="rating-section">
        <h3>Average Rating</h3>
        <RatingStars avgRating={product.avgRating} />
        {product.avgRating ? (
          <p className="avg-rating-value">{product.avgRating.toFixed(1)} out of 5</p>
        ) : null}
      </div>
      
      {/* Price and Add to Cart button */}
      <div className="details-price-section">
        <span className="details-price">${product.price.toFixed(2)}</span>
        <button 
          onClick={() => onAddToCart(product)} 
          className="add-to-cart"
        >
          Add to Cart
        </button>
      </div>

      {/* Reviews section - shows individual reviews with their ratings */}
      <div className="reviews-section">
        <h3>Customer Reviews ({product.reviews ? product.reviews.length : 0})</h3>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))
        ) : (
          <p className="no-reviews">No reviews yet</p>
        )}
      </div>
    </div>
  </div>
);

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <div className="cart-item">
    <img
      src={item.productImage ? `http://localhost:5000/uploads/${item.productImage}` : "/default-image.png"}
      alt={item.productname}
    />
    <div className="cart-item-details">
      <h3>{item.productname}</h3>
      <div className="quantity-controls">
        <button onClick={() => onUpdateQuantity(item.id, "decrease")} className="quantity-btn">-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, "increase")} className="quantity-btn">+</button>
      </div>
      <p>${(item.price * item.quantity).toFixed(2)}</p>
      <button onClick={() => onRemove(item.id)} className="remove-item">Remove</button>
    </div>
  </div>
);

const CheckoutForm = ({ cart, total, deliveryLocation, onDeliveryLocationChange, onSubmit, onClose }) => (
  <div className="checkout-popup">
    <div className="checkout-content">
      <button className="close-checkout" onClick={onClose}>
        <FiX size={24} />
      </button>

      {/* Payment Notice - Bold and Highlighted */}
      <div className="payment-warning">
        <p>⚠️ <strong>All payments are to be done in cash when the product arrives.</strong></p>
      </div>

      <h2>Checkout</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="deliveryLocation">Delivery Location:</label>
          <textarea
            id="deliveryLocation"
            value={deliveryLocation}
            onChange={(e) => onDeliveryLocationChange(e.target.value)}
            required
            placeholder="Enter your delivery address"
            className="delivery-input"
          />
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
          <p>Total Amount: ${total}</p>
        </div>
        <button type="submit" className="place-order-btn">
          Place Order
        </button>
      </form>
    </div>
  </div>
);

// PropTypes for sub-components
ProductCard.propTypes = {
  product: PropTypes.shape(ProductType).isRequired,
  onProductClick: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

ProductDetails.propTypes = {
  product: PropTypes.shape(ProductType).isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

CartItem.propTypes = {
  item: PropTypes.shape({
    ...ProductType,
    quantity: PropTypes.number.isRequired
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

CheckoutForm.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string.isRequired,
  deliveryLocation: PropTypes.string.isRequired,
  onDeliveryLocationChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

CategorySorter.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired
};

// Main component
const ProductListing = () => {
  const [state, setState] = useState({
    products: [],
    cart: [],
    loading: true,
    error: null,
    showCart: false,
    selectedProduct: null,
    showCheckoutForm: false,
    deliveryLocation: "",
    selectedCategory: "All"  // Default category for filtering
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // API calls
  const fetchProducts = async () => {
    try {
      const productResponse = await API.getAllProducts();
      const reviewResponse = await API.getAllReviews();
  
      if (Array.isArray(productResponse.data) && Array.isArray(reviewResponse.data)) {
        // Group reviews by productId
        const reviewsByProduct = {};
        reviewResponse.data.forEach((review) => {
          if (!reviewsByProduct[review.productId]) {
            reviewsByProduct[review.productId] = [];
          }
          reviewsByProduct[review.productId].push(review);
        });
  
        // Attach avgRating, reviews, and mock categories to each product
        const formattedProducts = productResponse.data.map((product) => {
          const productReviews = reviewsByProduct[product.id] || [];
          const avgRating =
            productReviews.length > 0
              ? productReviews.reduce((sum, r) => sum + r.Rating, 0) / productReviews.length
              : null;
          
          // Assign a mock category for demonstration
          // In a real application, this would come from your API
          const categories = ["Tools", "Pesticides", "Insecticides", "Machines"];
          const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  
          return {
            ...product,
            price: parseFloat(product.price) || 0,
            reviews: productReviews,
            avgRating: avgRating ? parseFloat(avgRating.toFixed(1)) : null,
            category: product.category || randomCategory // Use actual category if exists, otherwise use mock
          };
        });
  
        setState((prev) => ({ ...prev, products: formattedProducts, loading: false }));
      } else {
        setState((prev) => ({
          ...prev,
          error: "Invalid data format received from API",
          loading: false,
        }));
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: "Failed to fetch products and reviews",
        loading: false,
      }));
      console.error(err);
    }
  };
  
  // Filter products based on selected category
  const getFilteredProducts = () => {
    if (state.selectedCategory === "All") {
      return state.products;
    }
    return state.products.filter(product => product.category === state.selectedCategory);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setState(prev => ({ ...prev, selectedCategory: category }));
  };

  const toggleCart = () => {
    setState(prev => ({ ...prev, showCart: !prev.showCart }));
  };

  // Cart operations
  const addToCart = (product) => {
    setState(prev => {
      const existingItem = prev.cart.find(item => item.id === product.id);
      const newCart = existingItem
        ? prev.cart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev.cart, { ...product, quantity: 1 }];
      return { ...prev, cart: newCart };
    });
  };

  const updateCartQuantity = (productId, type) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.map(item =>
        item.id === productId
          ? {
              ...item,
              quantity: type === "increase"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1)
            }
          : item
      )
    }));
  };

  const removeFromCart = (productId) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== productId)
    }));
  };

  const calculateTotal = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // UI handlers
  const handleProductClick = (product) => {
    setState(prev => ({ ...prev, selectedProduct: product }));
    document.body.style.overflow = "hidden";
  };

  const closeProductDetails = () => {
    setState(prev => ({ ...prev, selectedProduct: null }));
    document.body.style.overflow = "auto";
  };

  const handleCheckout = () => {
    if (state.cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }

    setState(prev => ({
      ...prev,
      showCheckoutForm: true,
      showCart: false
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    const userId = localStorage.getItem("userId");
    if (!userId || userId === "undefined") {
      alert("User ID is missing. Please log in again.");
      return;
    }

    if (!state.deliveryLocation.trim()) {
      alert("Please enter a delivery location.");
      return;
    }

    // Show confirmation message before placing order
    const isConfirmed = window.confirm("Are you sure you want to place this order?");
    if (!isConfirmed) return;

    const totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = parseFloat(calculateTotal());

    const orderData = {
      userId: Number(userId),
      orderQuantity: totalQuantity,
      price: totalAmount,
      address: state.deliveryLocation,
      orderItems: state.cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await API.createOrder(orderData);
      if (response.status === 201) {
        alert("🎉 Order placed successfully! You will receive a confirmation email.");
        setState(prev => ({
          ...prev,
          cart: [],
          showCheckoutForm: false,
          deliveryLocation: ""
        }));
      }
    } catch (err) {
      console.error("Error creating order:", err.response?.data || err.message);
      alert(`⚠️ Order failed: ${err.response?.data?.error || "Server error. Please try again later."}`);
    }
  };

  // Loading and error states
  if (state.loading) {
    return (
      <div className="loading">
        <img src={load_gif} alt="Loading" className="loading-image" />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="error">
        <img src={err_img} alt="Error" className="error-image" />
        <p>{state.error}</p>
      </div>
    );
  }

  // Get filtered products
  const filteredProducts = getFilteredProducts();

  // Main render
  return (
    <div className="product-containerr">
      {/* Hero Section */}
      <HeroSection />
      
      <div className={`product-main ${state.selectedProduct ? "with-details" : ""}`}>
        {/* Category Sorter */}
        <CategorySorter 
          selectedCategory={state.selectedCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        
        <div className={`product-page ${state.selectedProduct ? "shifted" : ""}`}>
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                  onAddToCart={addToCart}
                />
              ))
            ) : (
              <div className="no-products">
                <p>No products found in this category.</p>
              </div>
            )}
          </div>
        </div>

        {state.selectedProduct && (
          <ProductDetails
            product={state.selectedProduct}
            onClose={closeProductDetails}
            onAddToCart={addToCart}
          />
        )}

        <div className="cart-icon" onClick={() => setState(prev => ({ ...prev, showCart: !prev.showCart }))}>
          <FiShoppingCart size={30} />
          {state.cart.length > 0 && <span className="cart-badge">{state.cart.length}</span>}
        </div>

        {state.showCart && (
          <div className="cart-popup">
            <div className="cart-header">
              <h2>Shopping Cart</h2>
              <button className="close-cart" onClick={toggleCart}>
                <FiX size={24} />
              </button>
            </div>
            {state.cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {state.cart.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateCartQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
                <div className="cart-summary">
                  <strong>Total: ${calculateTotal()}</strong>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {state.showCheckoutForm && (
          <CheckoutForm
            cart={state.cart}
            total={calculateTotal()}
            deliveryLocation={state.deliveryLocation}
            onDeliveryLocationChange={(value) => setState(prev => ({ ...prev, deliveryLocation: value }))}
            onSubmit={handlePlaceOrder}
            onClose={() => setState(prev => ({ ...prev, showCheckoutForm: false }))}
          />
        )}
      </div>
    </div>
  );
};

export default ProductListing;