const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

// Calculate shipping rates
router.get('/calculate-postage', deliveryController.calculateRates);

// Track shipment details
router.get('/track/:trackingId', deliveryController.trackShipment);

module.exports = router;
