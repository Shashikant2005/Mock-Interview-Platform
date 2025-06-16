const express = require('express');
const router = express.Router();
const { getInterviewCount } = require('../controlers/getInterviewCount');

// GET request to fetch interview count by clerkUserId
router.get('/interview-count/:clerkUserId', getInterviewCount);

module.exports = router;
