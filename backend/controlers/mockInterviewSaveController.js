const MockInterviewSchema = require("../models/MockInterviewSchema")

// Save a new mock interview
 async function saveMockInterview(req, res) {
  try {
    const {
      jsonMockResp,
      jobPosition,
      jobDescription,
      jobExperience,
      userUniqClearkId,
    } = req.body;


    const newMock = new MockInterviewSchema({
      jsonMockResp,
      jobPosition,
      jobDescription,
      jobExperience,
      userUniqClearkId,
    });

    await newMock.save();

    res.status(201).json({ message: 'Mock interview saved', data: newMock });
  } catch (error) {
    console.error('Error saving mock interview:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = {saveMockInterview}