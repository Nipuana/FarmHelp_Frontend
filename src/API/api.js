import axios from "axios";

const API_URL = "http://localhost:5000"; //Backend connection

// Function to get authorization headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

//   AUTHENTICATION API  
export const registerUser = async (userData) => {
    try {
        console.log("Sending Registration Request:", userData);
        const response = await axios.post(`${API_URL}/users/register`, userData);
        console.log(" Registration Response:", response.data);
        return response;
    } catch (error) {
        console.error(" API Registration Error:", error.response?.data || error.message);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        console.log(" Sending Login Request:", userData);
        const response = await axios.post(`${API_URL}/users/login`, userData);
        console.log(" Login Response:", response.data);
        return response;
    } catch (error) {
        console.error(" API Login Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getUsers = async () => {
    return axios.get(`${API_URL}/users/view_users`, { headers: getAuthHeaders() });
};

export const updateUser = async (id, userData) => {
    return axios.put(`${API_URL}/users/update_users/${id}`, userData, { headers: getAuthHeaders() });
};

export const deleteUser = async (id) => {
    return axios.delete(`${API_URL}/users/delete_users/${id}`, { headers: getAuthHeaders() });
};

//   PRODUCTS API  
export const createProduct = async (productData) => {
    return axios.post(`${API_URL}/products/create_products`, productData, { headers: getAuthHeaders() });
};

export const getAllProducts = async () => {
    return axios.get(`${API_URL}/products/view_products`);
};

export const getProductById = async (id) => {
    return axios.get(`${API_URL}/products/view_products/${id}`);
};

export const updateProduct = async (id, productData) => {
    return axios.put(`${API_URL}/products/update_products/${id}`, productData, { headers: getAuthHeaders() });
};

export const deleteProduct = async (id) => {
    return axios.delete(`${API_URL}/products/delete_products/${id}`, { headers: getAuthHeaders() });
};

//   ORDERS API  
export const createOrder = async (orderData) => {
    return axios.post(`${API_URL}/orders/create_orders`, orderData, { headers: getAuthHeaders() });
};

export const getAllOrders = async () => {
    return axios.get(`${API_URL}/orders/view_orders`, { headers: getAuthHeaders() });
};

export const updateOrder = async (id, orderData) => {
    return axios.put(`${API_URL}/orders/update_orders/${id}`, orderData, { headers: getAuthHeaders() });
};

export const deleteOrder = async (id) => {
    return axios.delete(`${API_URL}/orders/delete_orders/${id}`, { headers: getAuthHeaders() });
};

//   REVIEWS API  
export const createReview = async (reviewData) => {
    return axios.post(`${API_URL}/reviews/create_review`, reviewData, { headers: getAuthHeaders() });
};

export const getAllReviews = async () => {
    return axios.get(`${API_URL}/reviews/view_review`);
};

export const updateReview = async (id, reviewData) => {
    return axios.put(`${API_URL}/reviews/update_review/${id}`, reviewData, { headers: getAuthHeaders() });
};

export const deleteReview = async (id) => {
    return axios.delete(`${API_URL}/reviews/delete_review/${id}`, { headers: getAuthHeaders() });
};

//   CATEGORIES API  
export const createCategory = async (categoryData) => {
    return axios.post(`${API_URL}/categories/create_category`, categoryData, { headers: getAuthHeaders() });
};

export const getAllCategories = async () => {
    return axios.get(`${API_URL}/categories/view_category`);
};

export const updateCategory = async (id, categoryData) => {
    return axios.put(`${API_URL}/categories/update_category/${id}`, categoryData, { headers: getAuthHeaders() });
};

export const deleteCategory = async (id) => {
    return axios.delete(`${API_URL}/categories/delete_category/${id}`, { headers: getAuthHeaders() });
};

// Export all API functions
export default {
    registerUser,
    loginUser,
    getUsers,
    updateUser,
    deleteUser,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createOrder,
    getAllOrders,
    updateOrder,
    deleteOrder,
    createReview,
    getAllReviews,
    updateReview,
    deleteReview,
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};
