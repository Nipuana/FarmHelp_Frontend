import React, { useState, useEffect } from "react";
import API from "../../API/api"; // API file for backend calls
import "../../css/CrudProductCss/crudProduct.css";
import { FaEdit, FaTrash, FaSave, FaSearch, FaPlus } from "react-icons/fa";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Fetch categories for dropdown
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [editData, setEditData] = useState({
    productname: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    productImage: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productname: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    productImage: null,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Load categories for dropdown
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

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditData({
      productname: product.productname,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      categoryId: product.categoryId,
      productImage: product.productImage,
    });
  };

  const handleUpdateProduct = async () => {
    if (!editData.productname || !editData.price || !editData.quantity || !editData.categoryId) {
      alert("All fields are required!");
      return;
    }

    if (window.confirm("Are you sure you want to save these changes?")) {
      try {
        await API.updateProduct(editingProductId, editData);
        setEditingProductId(null);
        setEditData({
          productname: "",
          description: "",
          price: "",
          quantity: "",
          categoryId: "",
          productImage: "",
        });
        fetchProducts();
      } catch (err) {
        console.error("Error updating product", err);
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      try {
        await API.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product", err);
      }
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.productname || !newProduct.price || !newProduct.quantity || !newProduct.categoryId) {
      alert("All fields are required.");
      return;
    }

    if (window.confirm("Are you sure you want to add this product?")) {
      try {
        const formData = new FormData();
        formData.append("productname", newProduct.productname);
        formData.append("description", newProduct.description);
        formData.append("price", newProduct.price);
        formData.append("quantity", newProduct.quantity);
        formData.append("categoryId", newProduct.categoryId);
        if (newProduct.productImage) {
          formData.append("productImage", newProduct.productImage);
        }

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
    }
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, productImage: e.target.files[0] });
  };

  const getFilteredProducts = () => {
    return products
      .filter((product) => product.productname.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
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
          <input type="text" placeholder="Product Name" value={newProduct.productname} onChange={(e) => setNewProduct({ ...newProduct, productname: e.target.value })} />
          <input type="text" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <input type="number" placeholder="Quantity" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} />

          {/* Category Selector */}
          <select value={newProduct.categoryId} onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>

          {/* Image Upload */}
          <div className="image-upload">
            <label>Upload Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {/* Image Preview */}
          {newProduct.productImage && (
            <div className="image-preview">
              <img src={URL.createObjectURL(newProduct.productImage)} alt="Preview" />
            </div>
          )}

          <button className="save-btn_product" onClick={handleAddProduct}>
            <FaSave /> Save
          </button>
        </div>
      )}

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
                <td>{product.productname}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.categoryId}</td>
                <td>{product.productImage && <img src={`http://localhost:5000/uploads/${product.productImage}`} alt="Product" className="product-table-image" />}</td>
                <td>
                  <button className="edit-btn_product" onClick={() => handleEdit(product)}><FaEdit /></button>
                  <button className="delete-btn_product" onClick={() => handleDeleteProduct(product.id)}><FaTrash /></button>
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
