const mongoose = require("mongoose")
const mockVideoSchema = new mongoose.Schema({
  mockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MockInterviewSchema', // only if you want to use populate
    required: true,
  },
  userId: {
    type: String, // Clerk userId is string
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

mockVideoSchema.index({ mockId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('MockVideoSchema', mockVideoSchema);
