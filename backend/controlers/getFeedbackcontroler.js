const UserAnswerSchema = require("../models/UserAnswerSchema");

const getFeedbackByMockAndUser = async (req, res) => {
  try {
    const { mockIdRef, userId } = req.query;

    if (!mockIdRef || !userId) {
      return res.status(400).json({ message: "mockIdRef and userId are required." });
    }

    const answers = await UserAnswerSchema.find({ mockIdRef, userId });

    res.status(200).json({ answers });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Something went wrong while fetching feedback." });
  }
};

module.exports = { getFeedbackByMockAndUser };
