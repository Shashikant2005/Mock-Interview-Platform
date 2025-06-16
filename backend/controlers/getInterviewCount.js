// controllers/userController.js

const User = require('../models/User');

const getInterviewCount = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    if (!clerkUserId) {
      return res.status(400).json({ error: 'clerkUserId is required' });
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ interviewCount: user.interviewCount });
  } catch (error) {
    console.error('Error fetching interview count:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getInterviewCount };
