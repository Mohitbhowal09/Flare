const axios = require('axios');
require('dotenv').config();

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_AUTH_BASE = 'https://accounts.google.com/o/oauth2/v2/auth';

class YoutubeService {
  getAuthUrl() {
    const redirectUri = 'http://localhost:3001/api/auth/youtube/callback';
    const scopes = 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner';
    return `${YOUTUBE_AUTH_BASE}?client_id=${process.env.YOUTUBE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;
  }

  async getAccessToken(code) {
    const redirectUri = 'http://localhost:3001/api/auth/youtube/callback';
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.YOUTUBE_CLIENT_ID,
      client_secret: process.env.YOUTUBE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri
    });
    return response.data;
  }

  async getUserInfo(accessToken) {
    const response = await axios.get(`${YOUTUBE_API_BASE}/channels?part=snippet&mine=true`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (response.data.items && response.data.items.length > 0) {
      return {
        id: response.data.items[0].id,
        name: response.data.items[0].snippet.title,
        thumbnail: response.data.items[0].snippet.thumbnails.default.url
      };
    }
    
    throw new Error('No YouTube channel found');
  }

  async getStreamKey(accessToken) {
    // In a real implementation, this would fetch the actual stream key
    // For demo, we'll return a mock key
    return 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6';
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
    try {
      const response = await axios.get(`${YOUTUBE_API_BASE}/search?part=snippet&eventType=live&type=video&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (response.data.items && response.data.items.length > 0) {
        const stream = response.data.items[0];
        return {
          isLive: true,
          title: stream.snippet.title,
          description: stream.snippet.description,
          publishedAt: stream.snippet.publishedAt,
          thumbnailUrl: stream.snippet.thumbnails.medium.url
        };
      } else {
        return { isLive: false };
      }
    } catch (error) {
      return { isLive: false, error: error.message };
    }
  }
}

module.exports = new YoutubeService();
