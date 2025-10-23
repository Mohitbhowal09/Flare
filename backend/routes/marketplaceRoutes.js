const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.authenticate);

router.get('/templates', marketplaceController.getTemplates);
router.get('/templates/:id', marketplaceController.getTemplateById);
router.post('/purchase', marketplaceController.purchaseTemplate);

module.exports = router;
