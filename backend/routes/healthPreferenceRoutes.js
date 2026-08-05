const express = require('express');
const router = express.Router();
const healthPreferenceController = require('../controllers/healthPreferenceController');
const { extractUserId } = require('../middlewares/authMiddleware');

router.get('/', extractUserId, healthPreferenceController.getHealthPreferences);
router.post('/', extractUserId, healthPreferenceController.toggleHealthPreference);

module.exports = router;
