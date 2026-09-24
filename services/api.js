import { apiService, endpoints } from '../lib/api';

// Authentication API
export const authApi = {
  login: (credentials) =>
    apiService.post('/api/auth/login', { ...credentials }),
  register: (data) =>
    apiService.post('/api/auth/register', { ...data }),
  
  logout: () =>
    apiService.post('/api/auth/logout'),
  
  refreshToken: (refreshToken) =>
    apiService.post(endpoints.auth + '/refresh', { refreshToken }),
};

// Profile API
export const profileApi = {
  getProfile: () =>
    apiService.get('/api/profile/me'),
  changePassword: (data) =>
    apiService.patch('/api/profile/change-password', data),
  updateProfile: (data) =>
    apiService.put('/api/profile/update-profile', data),
  getFavouriteDishes: () =>
    apiService.get('/api/profile/get-favourite-dishes'),
};

export const orderHistoryApi = {
  getMyOrders: () => apiService.get('/api/orders/my-orders'),
};

export const cartApi = {
  get: () => apiService.get('/api/cart'),

  addItem: (data) => apiService.post('/api/cart', data),

  updateItem: (id, data) => apiService.put(`/api/cart/${id}`, { id, ...data }),

  removeItem: (id) => apiService.delete(`/api/cart/${id}`),
};

// Users API
export const usersApi = {
  getAll: (params) =>
    apiService.get(endpoints.users, params),
  
  getById: (id) =>
    apiService.get(`${endpoints.users}/${id}`),

  create: (data) =>
    apiService.post(endpoints.users, { ...data }),

  update: (id, data) =>
    apiService.put(`${endpoints.users}/${id}`, { ...data }),

  delete: (id) =>
    apiService.delete(`${endpoints.users}/${id}`),
  
  toggleStatus: (id) =>
    apiService.patch(`${endpoints.users}/${id}/toggle-status`),
};

// Food Categories API
export const foodCategoriesApi = {
  getAll: (params) =>
    apiService.get(endpoints.foodCategories, params),
  
  getById: (id) =>
    apiService.get(`${endpoints.foodCategories}/${id}`),
  
  create: (data) =>
              apiService.post(endpoints.foodCategories, { ...data }),
  
  update: (id, data) =>
    apiService.put(`${endpoints.foodCategories}/${id}`, { ...data }),
  
  delete: (id) =>
    apiService.delete(`${endpoints.foodCategories}/${id}`),
};

// Dishes API
export const dishesApi = {
  getAll: (params) =>
    apiService.get(endpoints.dishes, params),
  
  getById: (id) =>
    apiService.get(`${endpoints.dishes}/${id}`),
  
  create: (data) =>
    apiService.post(endpoints.dishes, { ...data }),
  
  update: (id, data) =>
        apiService.put(`${endpoints.dishes}/${id}`, { ...data }),
  
  delete: (id) =>
    apiService.delete(`${endpoints.dishes}/${id}`),
  
  updateStock: (id, data) =>
    apiService.patch(`${endpoints.dishes}/${id}/stock`, data),
};

// Dashboard API
export const dashboardApi = {
  getStats: () =>
    apiService.get(endpoints.dashboard),
  
  getRevenueChart: (period) =>
    apiService.get(`${endpoints.dashboard}/revenue-chart`, { period }),
  
  getTopDishes: (limit = 5) =>
    apiService.get(`${endpoints.dashboard}/top-dishes`, { limit }),
  
};

// Offers API
export const offersApi = {
    getAll: (params) =>
    apiService.get(endpoints.offers, params),
  
  getById: (id) =>
    apiService.get(`${endpoints.offers}/${id}`),
  
  create: (data) =>
      apiService.post(endpoints.offers, { ...data }),
  
  update: (id, data) =>
    apiService.put(`${endpoints.offers}/${id}`, { ...data }),
  
  delete: (id) =>
    apiService.delete(`${endpoints.offers}/${id}`),
  
  toggleStatus: (id) =>
    apiService.patch(`${endpoints.offers}/${id}/toggle-status`),
};

// Orders API
export const ordersApi = {
  getMyOrders: () => apiService.get(`${endpoints.orders}/my-orders`),

  getAll: (params) =>
    apiService.get(endpoints.orders, params),
  
  getById: (id) =>
    apiService.get(`${endpoints.orders}/${id}`),
  
  create: (data) =>
    apiService.post(endpoints.orders, { ...data }), 

  updateStatus: (id, status) =>
    apiService.put(`${endpoints.orders}/${id}/status`, { status }),

  cancel: (id) =>
    apiService.put(`${endpoints.orders}/${id}/cancel`),
};

// Invoices API
export const invoicesApi = {
  getAll: (params) =>
    apiService.get(endpoints.invoices, params),
  
  getById: (id) =>
    apiService.get(`${endpoints.invoices}/${id}`),
  
  create: (data) =>
    apiService.post(endpoints.invoices, { ...data }),
  
  update: (id, data) =>
    apiService.put(`${endpoints.invoices}/${id}`, { ...data }),
  
  delete: (id) =>
    apiService.delete(`${endpoints.invoices}/${id}`),
  
  markAsPaid: (id, paymentDate) =>
    apiService.patch(`${endpoints.invoices}/${id}/mark-paid`, { paymentDate }),
  
  download: (id) =>
    apiService.get(`${endpoints.invoices}/${id}/download`, { responseType: 'blob' }),
};

// Restaurant Details API
export const restaurantDetailsApi = {
  get: () =>
      apiService.get(endpoints.restaurantDetails),
  
  updateGeneral: (data) =>
    apiService.put(`${endpoints.restaurantDetails}/general`, { ...data }),
  
  updateDelivery: (data) =>
    apiService.put(`${endpoints.restaurantDetails}/delivery`, { ...data }),
  
  updateTheme: (data) =>
    apiService.put(`${endpoints.restaurantDetails}/theme`, { ...data }),
  
  updateAddress: (data) =>
    apiService.put(`${endpoints.restaurantDetails}/address`, { ...data }),
};
