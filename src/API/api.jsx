import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Change this if your backend is hosted elsewhere

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auth API
export const loginUser = (userData) => api.post('/users/login', userData);
export const registerUser = (userData) => api.post('/users/register', userData);
export const getUserProfile = (userId) => api.get(`/users/${userId}`);

// Business API
export const getBusinesses = () => api.get('/business');
export const getBusinessById = (id) => api.get(`/business/${id}`);
export const addBusiness = (businessData) => api.post('/business', businessData);

// Friends API
export const getFriends = () => api.get('/friends');
export const addFriend = (friendData) => api.post('/friends', friendData);

// Messages API
export const getMessages = (conversationId) => api.get(`/messages/${conversationId}`);
export const sendMessage = (messageData) => api.post('/messages', messageData);

// Products API
export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const addProduct = (productData) => api.post('/products', productData);

// Ratings API
export const getRatings = () => api.get('/ratings');
export const addRating = (ratingData) => api.post('/ratings', ratingData);

export default api;