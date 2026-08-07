const express = require("express");
const router = express.Router();

const {
  getAllOrders,
} = require("../controllers/orderController");

// Get all orders
router.get("/", getAllOrders);

module.exports = router;