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
const {verifyToken}=require('../middlewares/authMiddleware')

router.post('/signup', upload.single('tanCard'), signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

//change this currently with proper path
// router.get("/buyer/dashboard-metrics", verifyToken, (req, res) => {
//   res.status(200).json({
//     status: "Success",
//     message: "JWT Verification engine completely operational!",
//     userId: req.user.id,
//     role: req.user.role,
//   });
// });

module.exports = router;
