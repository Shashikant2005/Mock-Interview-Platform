
const express = require("express")
const router = express.Router();
const {getMockVideoOfIntControler} = require("../controlers/getVideoOfInterviewControler")

router.get("/getvideos",getMockVideoOfIntControler)
module.exports = router;