import api from "./apis";

const AuthService = {
  login: async (username_or_email, password) => {
    try {
      const response = await api.post('/login/', { username_or_email, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/register/', userData);
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },

  // Add other authentication-related methods here
};

export default AuthService;
