import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api' 
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const feedbackAPI = {
  submitFeedback: (feedbackData) => api.post('/feedback/submit', feedbackData),
};

export const facultyAPI = {
  getDashboard: (facultyName) => api.get(`/faculty/dashboard/${encodeURIComponent(facultyName)}`),
  getFacultyList: () => api.get('/faculty/list'),
};

export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
};

export default api;
