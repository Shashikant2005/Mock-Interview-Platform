const UserAnswerSchema = require("../models/UserAnswerSchema");

const saveUserAnswer = async (req, res) => {
  try {
    const {
      mockIdRef,
      question,
      correctAns,
      UserAns,
      feedback,
      rating,
      userId
    } = req.body;

    if (!mockIdRef || !question || !userId) {
      return res.status(400).json({ message: "mockIdRef, question, and userId are required." });
    }

    // Either update existing or insert new (upsert)
    const updatedAnswer = await UserAnswerSchema.findOneAndUpdate(
      { mockIdRef, question, userId },  // filter
      {
        $set: {
          correctAns,
          UserAns,
          feedback,
          rating
        }
      },
      {
        new: true,        // return the updated doc
        upsert: true,     // create if not exists
        setDefaultsOnInsert: true
      }
    );

    res.status(201).json({
      message: "Answer saved (or updated) successfully.",
      data: updatedAnswer
    });

  } catch (error) {
    console.error("Save/Update Error:", error);
    res.status(500).json({ message: "Something went wrong while saving the answer." });
  }
};

module.exports = { saveUserAnswer };
