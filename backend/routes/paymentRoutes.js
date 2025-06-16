const express = require('express');
const router = express.Router();
const {
  createOrder,
  getPaymentInfo,
  markPaid,
} = require('../controlers/paymentController');

// POST /create-order
router.post('/create-order', createOrder);

// GET /payment/:paymentid
router.get('/payment/:paymentid', getPaymentInfo);

// POST /mark-paid
router.post('/mark-paid', markPaid);

module.exports = router;
