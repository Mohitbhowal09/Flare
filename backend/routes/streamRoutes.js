const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.authenticate);

router.post('/start', streamController.startStream);
router.post('/stop', streamController.stopStream);
router.get('/status', streamController.getStreamStatus);

module.exports = router;
