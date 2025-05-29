const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// 🔧 Configure Cloudinary
cloudinary.config({
  cloud_name: 'dg30nx8hr',
  api_key: '195893941743473',
  api_secret: 'UeEE62UPLo0GtWn92xz4aVkP5GM',
});

exports.uploadVideo = async (req, res) => {
  try {
    const path = req.file.path;

    const result = await cloudinary.uploader.upload(path, {
      resource_type: 'video',
    });

    fs.unlinkSync(path); // delete local temp file
     //console.log(result.secure_url)
    res.json({ message: 'Video uploaded!', url: result.secure_url });
  } catch (error) {
    //console.log(error)
    res.status(500).json({ error: 'Upload failed', details: error });
  }
};
