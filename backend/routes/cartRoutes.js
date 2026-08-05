const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { extractUserId } = require('../middlewares/authMiddleware');

router.get('/', extractUserId, cartController.getCart);
router.post('/', extractUserId, cartController.addToCart);
router.put('/', extractUserId, cartController.updateCartQuantity);
router.delete('/', extractUserId, cartController.removeFromCart);

module.exports = router;
