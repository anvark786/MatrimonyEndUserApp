import api from './apis';

const chatService = {
  // Chat Rooms
  getChatRooms: async (page = 1) => {
    try {
      const response = await api.get(`/chat-rooms/?page=${page}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createOrGetChat: async (chatData) => {
    try {
      const response = await api.post('/chat-rooms/create_or_get_chat/', chatData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getChatRoom: async (chatRoomId) => {
    try {
      const response = await api.get(`/chat-rooms/${chatRoomId}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  blockUser: async (chatRoomId, reason = '') => {
    try {
      const response = await api.post(`/chat-rooms/${chatRoomId}/block_user/`, { reason });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  unblockUser: async (chatRoomId) => {
    try {
      const response = await api.post(`/chat-rooms/${chatRoomId}/unblock_user/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Messages
  getChatMessages: async (chatRoomId, page = 1) => {
    try {
      const response = await api.get(`/chat-rooms/${chatRoomId}/messages/?page=${page}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  sendMessage: async (chatRoomId, messageData) => {
    try {
      const formData = new FormData();
      
      if (messageData.content) {
        formData.append('content', messageData.content);
      }
      
      if (messageData.message_type) {
        formData.append('message_type', messageData.message_type);
      }
      
      if (messageData.reply_to) {
        formData.append('reply_to', messageData.reply_to);
      }
      
      if (messageData.file_attachment) {
        formData.append('file_attachment', messageData.file_attachment);
      }
      
      if (messageData.image_attachment) {
        formData.append('image_attachment', messageData.image_attachment);
      }

      const response = await api.post(`/chat-rooms/${chatRoomId}/send_message/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  markMessagesRead: async (chatRoomId) => {
    try {
      const response = await api.post(`/chat-rooms/${chatRoomId}/mark_messages_read/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteMessage: async (messageId) => {
    try {
      const response = await api.post(`/messages/${messageId}/delete_message/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  markMessageRead: async (messageId) => {
    try {
      const response = await api.post(`/messages/${messageId}/mark_read/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Notifications
  getChatNotifications: async (page = 1) => {
    try {
      const response = await api.get(`/chat-notifications/?page=${page}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  markAllNotificationsRead: async () => {
    try {
      const response = await api.post('/chat-notifications/mark_all_read/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  markNotificationRead: async (notificationId) => {
    try {
      const response = await api.post(`/chat-notifications/${notificationId}/mark_read/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Chat Settings
  getChatSettings: async () => {
    try {
      const response = await api.get('/chat-settings/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateChatSettings: async (settings) => {
    try {
      const response = await api.patch('/chat-settings/', settings);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Online Status
  setOnline: async () => {
    try {
      const response = await api.post('/online-status/set_online/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  setOffline: async () => {
    try {
      const response = await api.post('/online-status/set_offline/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  checkOnlineStatus: async (userIds) => {
    try {
      const response = await api.get(`/online-status/check_online_status/?user_ids=${userIds.join(',')}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Utility functions
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/upload-file/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Real-time connection helpers
  // getWebSocketUrl: (chatRoomId) => {
  //   const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  //   const host = window.location.host;
  //   return `${protocol}//${host}/ws/chat/${chatRoomId}/`;
  // },

  // Typing indicators
  sendTypingIndicator: async (chatRoomId, isTyping) => {
    try {
      const response = await api.post(`/chat-rooms/${chatRoomId}/typing/`, { is_typing: isTyping });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default chatService;
