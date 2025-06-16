// controllers/mockVideoController.js
const MockVideoSchema = require('../models/mockVideoSchema ');

const getMockVideoOfIntControler = async (req, res) => {
  try {
      const { mockId, userId } = req.query;
     
      if (!mockId || !userId) {
        return res.status(400).json({ message: "mockId and userId are required." });
      }

      const videos= await MockVideoSchema.find({ mockId, userId });
 
      res.status(200).json({ videos:videos });
    } catch (error) {
      console.error("Fetch Error:", error);
      res.status(500).json({ message: "Something went wrong while fetching videos." });
    }
};

module.exports = { getMockVideoOfIntControler };
