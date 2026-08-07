const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { extractUserId } = require('../middlewares/authMiddleware');

router.get('/', extractUserId, subscriptionController.getSubscriptions);
router.put('/:id/status', extractUserId, subscriptionController.updateSubscriptionStatus);
router.put('/:id/plan', extractUserId, subscriptionController.changeSubscriptionPlan);
router.put('/:id/auto-renew', extractUserId, subscriptionController.updateSubscriptionAutoRenew);

module.exports = router;
