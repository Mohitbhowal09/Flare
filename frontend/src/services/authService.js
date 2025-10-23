import apiClient from './apiClient';

export const authService = {
  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  async register(name, email, password) {
    const response = await apiClient.post('/auth/register', { name, email, password });
    return response.data;
  },

  async getTwitchAuthUrl() {
    const response = await apiClient.get('/auth/twitch');
    return response.data.url;
  },

  async getYoutubeAuthUrl() {
    const response = await apiClient.get('/auth/youtube');
    return response.data.url;
  }
};
