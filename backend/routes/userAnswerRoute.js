// routes/userAnswer.js
const express = require("express")
const { saveUserAnswer } =require( '../controlers/saveUseAnsControler');

const router = express.Router();

router.post('/saveUserOneQueAnswer', saveUserAnswer);

module.exports = router;
