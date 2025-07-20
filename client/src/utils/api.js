// client/src/utils/api.js
import axios from 'axios';

// client/src/utils/api.js
const api = axios.create({
  baseURL: 'https://expense-tracker-app-ey2g.onrender.com/api', // Use your new live URL
  //...
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
