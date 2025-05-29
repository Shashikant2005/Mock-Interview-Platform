const mongoose = require("mongoose")

const userAnswer = new mongoose.Schema({
  mockIdRef: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  correctAns: {
    type: String
  },
  UserAns: {
    type: String
  },
  feedback: {
    type: String
  },
  rating: {
    type: String
  },
  userId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Compound index to enforce uniqueness per interview per user per question
userAnswer.index({ mockIdRef: 1, question: 1, userId: 1 }, { unique: true });

const UserAnswerSchema = mongoose.model('UserAnswer', userAnswer);

module.exports= UserAnswerSchema;
