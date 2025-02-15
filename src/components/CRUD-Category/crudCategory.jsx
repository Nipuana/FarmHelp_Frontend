import React, { useState, useEffect } from "react";
import API from "../../API/api"; // API file for backend calls
import "../../css/CrudCss/crudCategory.css";
import { FaEdit, FaTrash, FaSave, FaSearch, FaPlus } from "react-icons/fa";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editData, setEditData] = useState({});
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
        fetchCategories();
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
    <div className="category-container">
      <h1 className="category-title">Categories</h1>

      <div className="header-section_category">
        <button className="add-category-btn" onClick={() => setShowAddCategory(!showAddCategory)}>
          <FaPlus /> ADD NEW CATEGORY
        </button>

        <div className="search-bar_category">
          <input
            type="text"
            placeholder="Search Category Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon_category" />
        </div>
      </div>

      {/* Add Category Form */}
      {showAddCategory && (
        <div className="add-category-form">
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
          <button className="save-btn_category" onClick={handleAddCategory}>
            <FaSave /> Save
          </button>
        </div>
      )}

      <div className="category-table">
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
                    <button className="save-btn_category" onClick={handleUpdateCategory}>
                      <FaSave />
                    </button>
                  ) : (
                    <>
                      <button className="edit-btn_category" onClick={() => handleEdit(category)}>
                        <FaEdit />
                      </button>
                      <button className="delete-btn_category" onClick={() => handleDeleteCategory(category.id)}>
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
      <div className="pagination_category">
        {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active_category" : ""}
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
