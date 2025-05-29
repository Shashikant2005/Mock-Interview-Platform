// routes/interviewRoutes.js
const express = require('express');
const router = express.Router();
const { getUserInterviewHistory } = require('../controlers/getHistoryOfInterviewControler');

router.get('/interview-history', getUserInterviewHistory);

module.exports = router;
