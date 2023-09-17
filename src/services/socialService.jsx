import api from "./apis";
const userData = JSON.parse(localStorage.getItem('userData'));

const socialService = {
    getSocialAccounts: async (pk) => {
        try {
            const response = await api.get('/profiles/' + pk + "/social_accounts/",);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    addSocialAccount: async (formData) => {
        try {
            const response = await api.post('/social-media/', { ...formData });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    editSocialAccount: async (formData, pk) => {
        try {
            const response = await api.patch('/social-media/' + pk + "/", { ...formData });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    deleteSocialAccount: async (pk) => {
        try {
            const response = await api.delete('/social-media/' + pk + "/");
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    enableDisableAccounts: async (pk) => {
        try {
            const response = await api.patch('/profiles/' + pk + "/lock_or_unlock_social/");
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

};

export default socialService;