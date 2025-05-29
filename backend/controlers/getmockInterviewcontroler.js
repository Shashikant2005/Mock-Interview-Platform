const MockInterviewSchema = require('../models/MockInterviewSchema'); // adjust path if needed
const mongoose = require('mongoose');

const getInterviewcontroler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid interview ID' });
  }

  try {
    const interview = await MockInterviewSchema.findById(id);
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }
    res.status(200).json(interview);
  } catch (err) {
    console.error('Error fetching interview by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getInterviewcontroler,
};
