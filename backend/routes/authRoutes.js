const express = require('express');
const router = express.Router();
const {
  signup,
  signin,
  forgotPassword,
  verifyOtp,
  resetPassword
} = require('../controllers/authController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/signup', upload.single('tanCard'), signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

module.exports = router;
