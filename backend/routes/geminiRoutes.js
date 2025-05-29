// routes/geminiRoutes.js

const express = require("express");
const router = express.Router();
const { generateFromGemini } = require("../controlers/geminiController");

router.post("/generate", generateFromGemini);

module.exports = router;
