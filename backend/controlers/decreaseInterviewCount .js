const User = require('../models/User');

const decreaseInterviewCount = async (req, res) => {
  try {
    const { clerkUserId } = req.body;

    if (!clerkUserId) {
      return res.status(400).json({ error: 'clerkUserId is required' });
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.interviewCount > 0) {
      user.interviewCount -= 1;
      await user.save();
    }

    return res.status(200).json({ message: 'Interview count updated' });

  } catch (error) {
    console.error('Error updating interview count:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { decreaseInterviewCount };
