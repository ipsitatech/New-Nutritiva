const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { extractUserId } = require('../middlewares/authMiddleware');

router.get('/', reviewController.getReviews);
router.post('/', extractUserId, reviewController.addReview);

module.exports = router;
