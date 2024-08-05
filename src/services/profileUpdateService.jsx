import api from "./apis";
const userData = JSON.parse(localStorage.getItem('userData'));

const profileUpdateService = {
  
  getProfileDetails: async (uuid) => {
    try {
        const response = await api.get(`/profiles/profile_by_uuid/?uuid=${uuid}`);
        return response.data;
      
    } catch (error) {
      throw error.response.data;
    }
  },
  
  getReligionsData: async () => {
    try {
      const response = await api.get('/religions/');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  getCommunitiesData: async () => {
    try {
      const response = await api.get('/communities/');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  getPhotos: async (id) => {
    try {
      const response = await api.get(`/profiles/${id}/profile_photos/`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default profileUpdateService;
