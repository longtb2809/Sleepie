import axios from 'axios';

// Tạo instance của axios với base URL là C# Backend
const api = axios.create({
  baseURL: '/api', // Gọi trực tiếp API trên cùng tên miền
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor tự động thêm JWT token vào mỗi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
