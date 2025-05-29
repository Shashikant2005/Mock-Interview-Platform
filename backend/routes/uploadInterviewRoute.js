const express = require('express');
const multer = require('multer');
const { uploadVideo } = require('../controlers/mockVideoUploadControler');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('video'), uploadVideo);

module.exports = router;
