import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Product API service
export const productApi = {
  // Get products with filters and pagination
  getProducts: debounce(async ({
    page = 1,
    limit = 12,
    category,
    search,
    sortBy,
    minPrice,
    maxPrice,
    season,
  } = {}) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...(category && { category }),
        ...(search && { search }),
        ...(sortBy && { sortBy }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        ...(season && { season }),
      });

      const { data } = await api.get(`/products?${params}`);
      return data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }, 300),

  // Get product by ID
  getProductById: async (id) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      return data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add/remove from wishlist
  toggleWishlist: async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login to continue');

      const response = await api.post(`/products/${productId}/wishlist`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add product review
  addReview: async (productId, review) => {
    try {
      const { data } = await api.post(`/products/${productId}/reviews`, review);
      return data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get product recommendations
  getRecommendations: async (limit = 4) => {
    try {
      const { data } = await api.get(`/products/recommendations?limit=${limit}`);
      return data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add to cart
  addToCart: async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login to continue');

      const response = await api.post(`/cart/items`, {
        productId,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;
