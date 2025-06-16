const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkUserId: {
    type: String, required: true, unique: true
  },
  isPaid: {
    type: Boolean, default: false
  },
  interviewCount: {
    type: Number,
    default: 10   // 🆓 Free limit for non-paid users
  },
  lastOrderId: String,
  lastPaymentId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
