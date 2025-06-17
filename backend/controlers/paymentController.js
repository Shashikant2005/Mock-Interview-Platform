const Razorpay = require('razorpay');
const User = require('../models/User');
require("dotenv").config();

const KEY_ID = process.env.KEY_ID;
const KEY_SECRET = process.env.KEY_SECRET;

const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 50000, // ₹100 in paise
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Order creation failed' });
  }
};

exports.getPaymentInfo = async (req, res) => {
  const { paymentid } = req.params;
  try {
    const payment = await razorpay.payments.fetch(paymentid);
    if (!payment) {
      return res.status(404).json({ message: "No payment found" });
    }
    res.status(200).json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
      id: payment.id,
    });
  } catch (error) {
    res.status(500).send("Failed to fetch payment info");
  }
};

exports.markPaid = async (req, res) => {
  const { clerkUserId, orderId, paymentId } = req.body;

  try {
    await User.findOneAndUpdate(
      { clerkUserId },
      {
        isPaid: true,
        interviewCount: 20,
        lastOrderId: orderId,
        lastPaymentId: paymentId,
      },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: 'User marked as premium.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user status' });
  }
};
