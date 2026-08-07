const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { extractUserId } = require('../middlewares/authMiddleware');

router.get('/', extractUserId, subscriptionController.getSubscriptions);
router.put('/:id/status', extractUserId, subscriptionController.updateSubscriptionStatus);

module.exports = router;
