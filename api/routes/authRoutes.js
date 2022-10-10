const express = require('express');
const router = express.Router();

// import the interface functions from the controller:
const {
  register,
  login,
  fetchUser,
  fetchProfile,
  editProfile,
  editUser,
  changePassword,
  followUser,
} = require('../controllers/authController');

// import the authorization middleware to protect private routes:
const { protect } = require('../middleware/authMiddleware');

// import the upload middleware to handle file uploads to the cloud:
const { upload } = require('../middleware/uploadMiddleware');

// define routes:
router.post('/', register);

router.post('/token', login);

router.get('/', fetchUser);

router.get('/profiles', fetchProfile);

router.put(
  '/profiles/edit',
  protect,
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'picture', maxCount: 1 },
  ]),
  editProfile
);

router.put('/edit/handle', protect, editUser);

router.put('/edit/password', protect, changePassword);

router.put('/follow', protect, followUser);

module.exports = router;
