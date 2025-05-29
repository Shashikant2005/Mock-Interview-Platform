const  mongoose = require( 'mongoose');

const mockInterview= new mongoose.Schema({
  jsonMockResp: {
    type: String,
    required: true
  },
  jobPosition: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  jobExperience: {
    type: String,
    required: true
  },
  userUniqClearkId: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const MockInterviewSchema = mongoose.model('MockInterviewSchema', mockInterview);

module.exports=  MockInterviewSchema;
