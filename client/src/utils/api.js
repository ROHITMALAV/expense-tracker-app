// client/src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// This is the crucial part:
// It automatically adds the token from localStorage to the header of every request.
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
