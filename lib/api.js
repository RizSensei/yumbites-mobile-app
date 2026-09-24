import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
const apiUrl = Platform.OS === 'android'
  ? configuredApiUrl.replace('://localhost', '://10.0.2.2')
  : configuredApiUrl;

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  profile: '/api/profile',
  users: '/api/users',
  foodCategories: '/api/categories',
  dishes: '/api/dishes',
  auth: '/api/auth',
  dashboard: '/api/dashboard',
  offers: '/api/promos',
  orders: '/api/orders',
  invoices: '/api/invoices',
  restaurantDetails: '/api/restaurant-details'
};

// Generic API functions
export const apiService = {
  get: (url, params) => api.get(url, { params }),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  delete: (url) => api.delete(url),
  patch: (url, data) => api.patch(url, data),
};
