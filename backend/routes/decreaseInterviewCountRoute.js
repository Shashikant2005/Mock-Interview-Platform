const express = require('express');
const router = express.Router();
const { decreaseInterviewCount } = require('../controlers/decreaseInterviewCount ');

// POST route to decrease interview count
router.post('/decrease-count', decreaseInterviewCount);

module.exports = router;
