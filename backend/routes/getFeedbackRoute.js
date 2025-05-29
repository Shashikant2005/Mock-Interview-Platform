const express = require("express");
const router = express.Router();
const { getFeedbackByMockAndUser } = require("../controlers/getFeedbackcontroler");

// GET /api/user-answers?mockIdRef=M123&userId=xyz123
router.get("/getfeedback", getFeedbackByMockAndUser);

module.exports = router;
