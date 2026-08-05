const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { extractUserId } = require('../middlewares/authMiddleware');

router.get('/', extractUserId, wishlistController.getWishlist);
router.post('/', extractUserId, wishlistController.toggleWishlist);

module.exports = router;
