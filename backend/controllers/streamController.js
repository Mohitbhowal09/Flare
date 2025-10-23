const twitchService = require('../services/twitchService');
const youtubeService = require('../services/youtubeService');
const encryptionService = require('../services/encryptionService');

exports.startStream = async (req, res) => {
  try {
    const { platform, encryptedKey, accessToken } = req.body;
    
    // Decrypt stream key
    const streamKey = encryptionService.decrypt(encryptedKey);
    
    let result;
    if (platform === 'twitch') {
      result = await twitchService.startStream(accessToken, streamKey);
    } else if (platform === 'youtube') {
      result = await youtubeService.startStream(accessToken, streamKey);
    } else {
      return res.status(400).json({ message: 'Unsupported platform' });
    }
    
    res.json({ message: 'Stream started successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to start stream', error: error.message });
  }
};

exports.stopStream = async (req, res) => {
  try {
    const { platform, accessToken } = req.body;
    
    let result;
    if (platform === 'twitch') {
      result = await twitchService.stopStream(accessToken);
    } else if (platform === 'youtube') {
      result = await youtubeService.stopStream(accessToken);
    } else {
      return res.status(400).json({ message: 'Unsupported platform' });
    }
    
    res.json({ message: 'Stream stopped successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to stop stream', error: error.message });
  }
};

exports.getStreamStatus = async (req, res) => {
  try {
    const { platform, accessToken } = req.query;
    
    let status;
    if (platform === 'twitch') {
      status = await twitchService.getStreamStatus(accessToken);
    } else if (platform === 'youtube') {
      status = await youtubeService.getStreamStatus(accessToken);
    } else {
      return res.status(400).json({ message: 'Unsupported platform' });
    }
    
    res.json({ status });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get stream status', error: error.message });
  }
};
