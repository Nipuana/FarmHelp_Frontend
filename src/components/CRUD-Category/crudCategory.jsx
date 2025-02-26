import React, { useState, useEffect } from "react";
import API from "../../API/api"; // API file for backend calls
import "../../css/CrudCategoryCss/crudCategory.css";
import { FaEdit, FaTrash, FaSave, FaSearch, FaPlus } from "react-icons/fa";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editData, setEditData] = useState({
    categoryName: "",
    categoryDescription: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    categoryDescription: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await API.getAllCategories();
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const handleEdit = (category) => {
    setEditingCategoryId(category.id);
    setEditData({
      categoryName: category.categoryName,
      categoryDescription: category.categoryDescription,
    });
  };

  const handleUpdateCategory = async () => {
    if (!editData.categoryName) {
      alert("Category Name is required!");
      return;
    }

    if (window.confirm("Are you sure you want to save these changes?")) {
      try {
        await API.updateCategory(editingCategoryId, editData);
        setEditingCategoryId(null);
        setEditData({ categoryName: "", categoryDescription: "" }); // Reset editData
        fetchCategories(); // Refresh the categories list
      } catch (err) {
        console.error("Error updating category", err);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      try {
        await API.deleteCategory(id);
        fetchCategories();
      } catch (err) {
        console.error("Error deleting category", err);
      }
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.categoryName) {
      alert("Category Name is required.");
      return;
    }

    if (window.confirm("Are you sure you want to add this category?")) {
      try {
        await API.createCategory(newCategory);
        setShowAddCategory(false);
        setNewCategory({
          categoryName: "",
          categoryDescription: "",
        });
        fetchCategories();
      } catch (err) {
        console.error("Error adding category", err);
      }
    }
  };

  const getFilteredCategories = () => {
    return categories
      .filter((category) => category.categoryName.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  };

  return (
    <div className="category-container ant-category-container">
      <h1 className="ant-category-title">Categories</h1>

      <div className="ant-header-section">
        <button className="ant-add-category-btn" onClick={() => setShowAddCategory(!showAddCategory)}>
          <FaPlus /> ADD NEW CATEGORY
        </button>

        <div className="ant-search-bar">
          <input
            type="text"
            placeholder="Search Category Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="ant-search-icon" />
        </div>
      </div>

      {/* Add Category Form */}
      {showAddCategory && (
        <div className="ant-add-category-form">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.categoryName}
            onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category Description"
            value={newCategory.categoryDescription}
            onChange={(e) => setNewCategory({ ...newCategory, categoryDescription: e.target.value })}
          />
          <button className="ant-save-btn" onClick={handleAddCategory}>
            <FaSave /> Save
          </button>
        </div>
      )}

      <div className="ant-category-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredCategories().map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>
                  {editingCategoryId === category.id ? (
                    <input
                      type="text"
                      value={editData.categoryName}
                      onChange={(e) => setEditData({ ...editData, categoryName: e.target.value })}
                    />
                  ) : (
                    category.categoryName
                  )}
                </td>
                <td>
                  {editingCategoryId === category.id ? (
                    <input
                      type="text"
                      value={editData.categoryDescription}
                      onChange={(e) => setEditData({ ...editData, categoryDescription: e.target.value })}
                    />
                  ) : (
                    category.categoryDescription
                  )}
                </td>
                <td>
                  {editingCategoryId === category.id ? (
                    <button className="ant-save-btn" onClick={handleUpdateCategory}>
                      <FaSave />
                    </button>
                  ) : (
                    <>
                      <button className="ant-edit-btn" onClick={() => handleEdit(category)}>
                        <FaEdit />
                      </button>
                      <button className="ant-delete-btn" onClick={() => handleDeleteCategory(category.id)}>
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="ant-pagination">
        {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "ant-active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTable;