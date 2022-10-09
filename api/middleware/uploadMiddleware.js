require('dotenv').config({ path: '../.env' });

// configure cloudinary for cloud uploading:
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// require multer to handle files present in requests
// that come as FormData objects:
const multer = require('multer');

// require multer-storage-cloudinary to enable multer to upload to the cloud:
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// configure multer storage to direct uploads to the correct cloudinary folder
// depending on the file's fieldname, and assign the user id as the file's public_id:
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => {
      if (file.fieldname === 'banner') {
        return 'social-app/banners/';
      } else if (file.fieldname === 'picture') {
        return 'social-app/pictures/';
      }
    },
    public_id: (req, file) => req.body.userID,
  },
});

// create the file upload middleware function:
const upload = multer({ storage: storage });

module.exports = { upload };
