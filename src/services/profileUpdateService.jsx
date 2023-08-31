import api from "./apis";
const userData = JSON.parse(localStorage.getItem('userData'));

const profileUpdateService = {
  
  createProfile: async (formData) => {
    console.log("formDat",formData);
    try {
      const response = await api.post('/profiles/', { ...formData, user:userData?.user_id });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  getProfile: async (id) => {
    try {
      let url = '/profiles/'+id+'/matching_profiles/'
        const response = await api.get(url);
        return response.data;
      
    } catch (error) {
      throw error.response.data;
    }
  },
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
  createEducation: async (formData) => {
    console.log("formDat",formData);
    try {
      const response = await api.post('/educations/', { ...formData, profile:userData?.profile_id });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  createOccupation: async (formData) => {
    console.log("formDat",formData);
    try {
      const response = await api.post('/occupations/', { ...formData, profile:userData?.profile_id });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  createFamily: async (formData) => {
    console.log("formDat",formData);
    try {
      const response = await api.post('/family-details/', { ...formData, profile:userData?.profile_id });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  createAddress: async (formData) => {
    console.log("formDat",formData);
    try {
      const response = await api.post('/address/', { ...formData, profile:userData?.profile_id });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  createPreferences: async (formData) => {
    console.log("formDat",formData);
    try {
      const response = await api.post('/preferences/', { ...formData, profile:userData?.profile_id });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Add other authentication-related methods here
};

export default profileUpdateService;


// import axios from 'axios';

// // Create an axios instance
// const api = axios.create({
//   baseURL: 'your-api-base-url',
// });

// // Define your API methods
// const ApiService = {
//   createEducation: async (formData) => {
//     try {
//       const headers = {
//         // Pass the access token only for this request
//         Authorization: `Bearer ${accessToken}`,
//       };
//       const response = await api.post('/educations/', { ...formData, profile: userData?.profile_id }, { headers });
//       return response.data;
//     } catch (error) {
//       throw error.response.data;
//     }
//   },

//   // Other methods without access token
// };

// export default ApiService;
