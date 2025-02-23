import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiX } from "react-icons/fi";
import PropTypes from 'prop-types';
import API from "../../API/api";
import "../../css/ProductCss/productListing.css";
import err_img from "../../images/failed_product.png";
import load_gif from "../../images/Loading.gif";

// PropTypes definitions
const ProductType = {
  id: PropTypes.number.isRequired,
  productname: PropTypes.string, // Remove `.isRequired`
  description: PropTypes.string,
  price: PropTypes.number,
  productImage: PropTypes.string
};


// Sub-components
const ProductCard = ({ product, onProductClick, onAddToCart }) => {
  const name = product.productname || product.productName || "Unnamed Product";
  const price = Number(product.price) || 0; // Ensure price is a number

  return (
    <div className="product-card" onClick={() => onProductClick(product)}>
      <img
        className="product-image1"
        src={product.productImage ? `http://localhost:5000/uploads/${product.productImage}` : "/default-image.png"}
        alt={name}
      />
      <div className="product-details">
        <h2>{name}</h2>
        <div className="product-footer">
          <span className="product_price">${price.toFixed(2)}</span>
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
      <p className="details-description">{product.description}</p>
      <div className="details-price-section">
        <span className="details-price">${product.price}</span>
        <button onClick={() => onAddToCart(product)} className="add-to-cart">
          Add to Cart
        </button>
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

      {/* ✅ Payment Notice - Bold and Highlighted */}
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
    deliveryLocation: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // API calls
  const fetchProducts = async () => {
    try {
        const response = await API.getAllProducts();
        console.log("Fetched Products:", response.data); // Debugging log

        if (Array.isArray(response.data)) {
            const formattedProducts = response.data.map(product => ({
                ...product,
                price: parseFloat(product.price) || 0 // Convert price to a number
            }));

            setState(prev => ({ ...prev, products: formattedProducts, loading: false }));
        } else {
            setState(prev => ({
                ...prev,
                error: "Invalid products data format",
                loading: false
            }));
        }
    } catch (err) {
        setState(prev => ({
            ...prev,
            error: "Failed to fetch products",
            loading: false
        }));
        console.error(err);
    }
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

    // ✅ Show confirmation message before placing order
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

  // Main render
  return (
    <div className={`product-main ${state.selectedProduct ? "with-details" : ""}`}>
      <div className={`product-page ${state.selectedProduct ? "shifted" : ""}`}>
        <div className="product-grid">
          {state.products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
              onAddToCart={addToCart}
            />
          ))}
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
          <h2>Shopping Cart</h2>
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
  );
};

export default ProductListing;