const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { extractUserId } = require('../middlewares/authMiddleware');

router.get('/', extractUserId, orderController.getOrders);
router.get('/items', extractUserId, orderController.getOrderItems);
router.post('/checkout', extractUserId, orderController.checkout);
router.post('/verify-payment', extractUserId, orderController.verifyPayment);
router.post('/cancel', extractUserId, orderController.cancelOrder);

module.exports = router;
