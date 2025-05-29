// controllers/interviewController.js
const Interview = require('../models/MockInterviewSchema');

exports.getUserInterviewHistory = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const history = await Interview.find({ userUniqClearkId:userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.error("❌ Error fetching interview history:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
