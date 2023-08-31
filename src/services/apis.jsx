import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/v1/'; // Replace with your actual API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    // 'Access-Control-Allow-Origin':'*',
    // You can add additional headers here
  },
});

const userData = JSON.parse(localStorage.getItem('userData'));

if (userData?.access_token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${userData?.access_token}`;
}

export default api;
