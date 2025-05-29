const express = require('express');
const router = express.Router();
const {getInterviewcontroler} = require("../controlers/getmockInterviewcontroler")

// GET /api/mock-interview/:id
router.get('/interview/:id', getInterviewcontroler);

module.exports = router;
