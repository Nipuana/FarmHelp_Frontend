import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi"; // Import cart icon
import API from "../../API/api";
import "../../css/ProductCss/productListing.css";
import err_img from "../../images/failed_product.png";
import load_gif from "../../images/Loading.gif";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.getAllProducts();
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

  const updateCartQuantity = (productId, type) => {
    setCart(cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (loading) return <div className="loading"><img src={load_gif} alt="Loading" className="loading-image" /></div>;

  if (error) return (
    <div className="error">
      <img src={err_img} alt="Error" className="error-image" />
      <p>{error}</p>
    </div>
  );

  return (
    <div className="product-main">
      <div className="product-page">
        {/* Product Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img className="product-image1"
                src={product.productImage ? `http://localhost:5000/uploads/${product.productImage}` : "/default-image.png"}
                alt={product.productname}
              />
              <div className="product-details">
                <h2>{product.productname}</h2>
                <p className="description">{product.description}</p>
                <div className="product-footer">
                  <span className="product_price">${product.price}</span>
                  <button onClick={() => addToCart(product)} className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Icon */}
      <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
        <FiShoppingCart size={30} />
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      </div>

      {/* Cart Pop-up */}
      {showCart && (
        <div className="cart-popup">
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
                    <div className="quantity-controls">
                      <button onClick={() => updateCartQuantity(item.id, "decrease")} className="quantity-btn">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, "increase")} className="quantity-btn">+</button>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="remove-item">Remove</button>
                  </div>
                </div>
              ))}
              <div className="cart-summary">
                <strong>Total: ${calculateTotal()}</strong>
                <button className="checkout-btn">Checkout</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductListing;
