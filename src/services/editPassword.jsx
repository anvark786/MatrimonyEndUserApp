import api from "./apis";

const editPassword = {
  updatePassword: async (formData) => {
    try {
      const response = await api.post('update-login-password/', formData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to update password' };
    }
  },
};

export default editPassword;