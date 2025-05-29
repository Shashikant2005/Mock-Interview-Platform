// controllers/geminiController.js

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const geminiApiKey = process.env.Gemini_API_KEY;

if (!geminiApiKey) {
  throw new Error("Gemini_API_KEY not set in environment variables");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Handles prompt generation via Gemini AI
 * @route POST /api/generate
 * @body { prompt: string }
 */
const generateFromGemini = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return res.status(200).json({ response: text });
  } catch (error) {
    console.error("Error in Gemini generation:", error);
    return res.status(500).json({ error: "Failed to generate content from Gemini AI" });
  }
};

module.exports = {
  generateFromGemini,
};
