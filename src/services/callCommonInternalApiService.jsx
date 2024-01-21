import api from "./apis";

const callCommonInternalApiService = async (url, method, formData) => {
  if (method === 'get' || method === 'delete') {
    try {
      const response = await api[method.toLowerCase()](url);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  } else if (method === 'post' || method === 'patch') {
    try {
      const response = await api[method.toLowerCase()](url, formData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default callCommonInternalApiService;
