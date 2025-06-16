const express = require('express');
const router = express.Router();
const { saveMockVideoControler } = require('../controlers/mockVideoInDBController');

router.post('/saveinDb', saveMockVideoControler);

module.exports = router;