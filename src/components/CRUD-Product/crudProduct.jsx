import React, { useState, useEffect } from "react";
import API from "../../API/api"; // API file for backend calls
import "../../css/CrudProductCss/crudProduct.css";
import { FaEdit, FaTrash, FaSave, FaSearch, FaPlus, FaTimes } from "react-icons/fa";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    productname: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    productImage: null,
  });
  const [editData, setEditData] = useState({});
  const [editImage, setEditImage] = useState(null); // For editing product image

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.getAllProducts();
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await API.getAllCategories();
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.productname || !newProduct.price || !newProduct.quantity || !newProduct.categoryId) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", newProduct.productname);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("quantity", newProduct.quantity);
    formData.append("categoryId", newProduct.categoryId);
    if (newProduct.productImage) {
      formData.append("productImage", newProduct.productImage);
    }

    try {
      await API.createProduct(formData);
      setShowAddProduct(false);
      setNewProduct({
        productname: "",
        description: "",
        price: "",
        quantity: "",
        categoryId: "",
        productImage: null,
      });
      fetchProducts();
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product", err);
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setEditData({
      productname: product.productName,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      categoryId: product.categoryId,
    });
    setEditImage(null);
  };

  const handleSaveEdit = async () => {
    if (!editData.productname || !editData.price || !editData.quantity || !editData.categoryId) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", editData.productname);
    formData.append("description", editData.description);
    formData.append("price", editData.price);
    formData.append("quantity", editData.quantity);
    formData.append("categoryId", editData.categoryId);
    if (editImage) {
      formData.append("productImage", editImage);
    }

    try {
      await API.updateProduct(editingProductId, formData);
      setEditingProductId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  const getFilteredProducts = () => {
    return products.filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="product-container">
      <h1 className="product-title">Products</h1>

      <div className="header-section_product">
        <button className="add-product-btn" onClick={() => setShowAddProduct(!showAddProduct)}>
          <FaPlus /> ADD NEW PRODUCT
        </button>

        <div className="search-bar_product">
          <input
            type="text"
            placeholder="Search Product Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon_product" />
        </div>
      </div>

      {/* Add Product Form */}
      {showAddProduct && (
        <div className="add-product-form">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.productname}
            onChange={(e) => setNewProduct({ ...newProduct, productname: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
          />

          <select
            value={newProduct.categoryId}
            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>

          <div className="image-upload">
            <label>Upload Product Image</label>
            <input type="file" accept="image/*" onChange={(e) => setNewProduct({ ...newProduct, productImage: e.target.files[0] })} />
          </div>

          <button className="save-btn_product" onClick={handleAddProduct}>
            <FaSave /> Save
          </button>
        </div>
      )}

      {/* Product Table */}
      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredProducts().map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.categoryId}</td>
                <td>
                  {product.productImage && (
                    <img src={`http://localhost:5000/uploads/${product.productImage}`} alt="Product" className="product-table-image" />
                  )}
                </td>
                <td>
                  <button className="edit-btn_product" onClick={() => handleEditProduct(product)}>
                    <FaEdit />
                  </button>
                  <button className="delete-btn_product" onClick={() => handleDeleteProduct(product.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
