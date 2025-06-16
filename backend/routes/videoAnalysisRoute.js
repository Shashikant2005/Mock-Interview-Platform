const express = require("express");
const router = express.Router();
const { analyzeVideo } = require("../controlers/videoAnalysisController");

router.post("/videoanalysis", analyzeVideo);

module.exports = router;
