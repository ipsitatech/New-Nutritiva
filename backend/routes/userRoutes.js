const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { extractUserId } = require('../middlewares/authMiddleware');

router.get('/', extractUserId, userController.getUserProfile);
router.put('/', extractUserId, userController.updateUserProfile);

module.exports = router;
