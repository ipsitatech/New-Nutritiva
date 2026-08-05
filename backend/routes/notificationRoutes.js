const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { extractUserId } = require('../middlewares/authMiddleware');

router.get('/', extractUserId, notificationController.getNotifications);
router.put('/', extractUserId, notificationController.markNotificationRead);

module.exports = router;
