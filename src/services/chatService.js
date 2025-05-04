// src/services/chatService.js
import axios from 'axios';

const API_URL = "https://reseach-connect-pkad.vercel.app" || 'http://localhost:5000/api';

const chatService = {
  // Get chat messages for a project with pagination
  getChatMessages: async (projectId, token, page = 1, limit = 50) => {
    try {
      const response = await axios.get(
        `${API_URL}/projects/${projectId}/chat?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Send message with optional file attachments
  sendMessage: async (projectId, messageData, token) => {
    try {
      const formData = new FormData();

      if (messageData.content) {
        formData.append('content', messageData.content);
      }

      if (messageData.attachments && messageData.attachments.length > 0) {
        for (const file of messageData.attachments) {
          formData.append('attachments', file);
        }
      }

      const response = await axios.post(
        `${API_URL}/projects/${projectId}/chat`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mark all messages as read in a chat room
  markAllMessagesAsRead: async (projectId, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/projects/${projectId}/chat/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mark a specific message as read
  markMessageAsRead: async (projectId, messageId, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/projects/${projectId}/chat/${messageId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add or remove reaction from a message
  toggleReaction: async (projectId, messageId, reaction, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/projects/${projectId}/chat/${messageId}/reactions`,
        { reaction },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get unread message count for all chats
  getUnreadMessageCounts: async (token) => {
    try {
      const response = await axios.get(
        `${API_URL}/chat/unread`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default chatService;
