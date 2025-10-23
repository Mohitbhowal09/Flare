const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/twitch', authController.getTwitchAuthUrl);
router.get('/twitch/callback', authController.handleTwitchCallback);
router.get('/youtube', authController.getYoutubeAuthUrl);
router.get('/youtube/callback', authController.handleYoutubeCallback);

module.exports = router;
