const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/signup', upload.single('tanCard'), signup);
router.post('/signin', signin);

module.exports = router;
