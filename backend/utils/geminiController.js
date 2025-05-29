const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const geminiApiKey = process.env.Gemini_API_KEY;

if (!geminiApiKey) {
  throw new Error("Gemini_API_KEY not set in environment variables");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// /**
//  * Sends a prompt to Gemini AI and returns generated text.
//  * @param {string} prompt The prompt to send
//  * @returns {Promise<string>} Generated text response
//  * @throws Will throw error if request fails
//  */
async function generateFromGemini(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error in Gemini generation:", error);
    throw new Error("Failed to generate content from Gemini AI");
  }
}

module.exports = {
  generateFromGemini,
};
