const axios = require('axios');
require('dotenv').config();

const TWITCH_API_BASE = 'https://api.twitch.tv/helix';
const TWITCH_AUTH_BASE = 'https://id.twitch.tv/oauth2';

class TwitchService {
  getAuthUrl() {
    const redirectUri = 'http://localhost:3001/api/auth/twitch/callback';
    return `${TWITCH_AUTH_BASE}/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=user:read:email+channel:manage:broadcast`;
  }

  async getAccessToken(code) {
    const redirectUri = 'http://localhost:3001/api/auth/twitch/callback';
    const response = await axios.post(`${TWITCH_AUTH_BASE}/token`, null, {
      params: {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      }
    });
    return response.data;
  }

  async getUserInfo(accessToken) {
    const response = await axios.get(`${TWITCH_API_BASE}/users`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-ID': process.env.TWITCH_CLIENT_ID
      }
    });
    return response.data.data[0];
  }

  async getStreamKey(accessToken) {
    const user = await this.getUserInfo(accessToken);
    const response = await axios.get(`${TWITCH_API_BASE}/streams/key?broadcaster_id=${user.id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-ID': process.env.TWITCH_CLIENT_ID
      }
    });
    return response.data.data[0].stream_key;
  }

  async startStream(accessToken, streamKey) {
    // In a real implementation, this would start the actual stream
    // For demo, we'll just return success
    return { success: true, message: 'Stream started' };
  }

  async stopStream(accessToken) {
    // In a real implementation, this would stop the actual stream
    // For demo, we'll just return success
    return { success: true, message: 'Stream stopped' };
  }

  async getStreamStatus(accessToken) {
    const user = await this.getUserInfo(accessToken);
    try {
      const response = await axios.get(`${TWITCH_API_BASE}/streams?user_id=${user.id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Client-ID': process.env.TWITCH_CLIENT_ID
        }
      });
      
      if (response.data.data.length > 0) {
        const stream = response.data.data[0];
        return {
          isLive: true,
          title: stream.title,
          viewers: stream.viewer_count,
          startedAt: stream.started_at,
          game: stream.game_name,
          thumbnailUrl: stream.thumbnail_url
        };
      } else {
        return { isLive: false };
      }
    } catch (error) {
      return { isLive: false, error: error.message };
    }
  }
}

module.exports = new TwitchService();
