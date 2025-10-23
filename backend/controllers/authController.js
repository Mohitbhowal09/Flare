const User = require('../models/User');
const encryptionService = require('../services/encryptionService');
const twitchService = require('../services/twitchService');
const youtubeService = require('../services/youtubeService');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // In a real app, you'd hash passwords
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json({ 
      user: { id: user.id, email: user.email, name: user.name },
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = await User.create({ email, password, name });
    res.status(201).json({ 
      user: { id: user.id, email: user.email, name: user.name },
      message: 'Registration successful'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTwitchAuthUrl = (req, res) => {
  const url = twitchService.getAuthUrl();
  res.json({ url });
};

exports.handleTwitchCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const tokenData = await twitchService.getAccessToken(code);
    const userData = await twitchService.getUserInfo(tokenData.access_token);
    
    // Encrypt and store stream key
    const streamKey = await twitchService.getStreamKey(tokenData.access_token);
    const encryptedKey = encryptionService.encrypt(streamKey);
    
    res.json({
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      user: userData,
      streamKey: encryptedKey
    });
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed' });
  }
};

exports.getYoutubeAuthUrl = (req, res) => {
  const url = youtubeService.getAuthUrl();
  res.json({ url });
};

exports.handleYoutubeCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const tokenData = await youtubeService.getAccessToken(code);
    const userData = await youtubeService.getUserInfo(tokenData.access_token);
    
    // Get stream key
    const streamKey = await youtubeService.getStreamKey(tokenData.access_token);
    const encryptedKey = encryptionService.encrypt(streamKey);
    
    res.json({
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      user: userData,
      streamKey: encryptedKey
    });
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed' });
  }
};
