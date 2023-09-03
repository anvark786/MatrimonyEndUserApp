import api from "./apis";
const userData = JSON.parse(localStorage.getItem('userData'));

const managePhotos = {

  uploadImage: async (formData) => {
    console.log("formDat",formData);
    try {
      const response = await api.post('/photos/', { ...formData, profile:userData?.profile_id });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  deleteImage: async (pk) => {
    try {
      const response = await api.delete('/photos/'+pk+"/");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  updateImage: async (formData,pk) => {
    try {
      const response = await api.patch('/photos/'+pk+"/",{...formData});
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default managePhotos;