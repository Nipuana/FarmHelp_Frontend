import React, { useState, useEffect } from "react";
import API from "../../api/api"; // Import API file
import "../../css/ProductCss/productListing.css";
import err_img from "../../images/failed_product.png";
import load_gif from "../../images/Loading.gif";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Controls modal visibility

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.getAllProducts(); // Fetch products from API
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    setShowModal(true); // Open confirmation modal
  };

  const confirmCheckout = async () => {
    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price * item.quantity,
        })),
        total: calculateTotal(),
        status: "pending",
      };

      await API.createOrder(orderData);
      alert("Order placed successfully!");
      setCart([]); // Clear cart after checkout
      setShowModal(false);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  if (loading) return <div className="loading"><img src={load_gif} alt="Loading" className="loading-image" /></div>;

  if (error) return (
    <div className="error">
      <img src={err_img} alt="Error" className="error-image" />
      <p>{error}</p>
    </div>
  );

  return (
    <div className="product-page">
      {/* Product Grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.productImage ? `http://localhost:5000/uploads/${product.productImage}` : "/default-image.png"}
              alt={product.productname}
            />
            <div className="product-details">
              <h2>{product.productname}</h2>
              <p className="description">{product.description}</p>
              <div className="product-footer">
                <span className="price">${product.price}</span>
                <button onClick={() => addToCart(product)} className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="cart-sidebar">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.productImage ? `http://localhost:5000/uploads/${item.productImage}` : "/default-image.png"}
                  alt={item.productname} 
                />
                <div className="cart-item-details">
                  <h3>{item.productname}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="remove-item">Remove</button>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <strong>Total: ${calculateTotal()}</strong>
              <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            </div>
          </>
        )}
      </div>

      {/* Checkout Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Order</h3>
            <p>Total Amount: ${calculateTotal()}</p>
            <button onClick={confirmCheckout} className="confirm-btn">Confirm</button>
            <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
