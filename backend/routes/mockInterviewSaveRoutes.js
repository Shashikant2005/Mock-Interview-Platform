const  { saveMockInterview } = require('../controlers/mockInterviewSaveController');

const  express = require('express');

const router = express.Router();

router.post('/mock-interview', saveMockInterview);

module.exports =  router;
