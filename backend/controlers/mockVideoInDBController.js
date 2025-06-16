// controllers/mockVideoController.js
const MockVideoSchema = require('../models/mockVideoSchema ');

const saveMockVideoControler = async (req, res) => {
  const { videoUrl, mockId , userId } = req.body;
    console.log(videoUrl)
    console.log(mockId)
    console.log(userId)
  if (!videoUrl || !mockId || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
   console.log(videoUrl)
    console.log(mockId)
    console.log(userId)
  try {
    // Ensure only one video per user per interview
    const existing = await MockVideoSchema.findOne({ userId, mockId });
    if (existing) {
      return res.status(400).json({ error: 'Video already uploaded for this interview' });
    }

    const newVideo = new MockVideoSchema({ videoUrl, userId, mockId });
    await newVideo.save();

    res.status(201).json({ message: 'Video saved successfully', video: newVideo });
  } catch (error) {
    console.error('Error saving video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { saveMockVideoControler };
