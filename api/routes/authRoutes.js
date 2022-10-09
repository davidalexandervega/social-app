const express = require('express');
const router = express.Router();

// import the interface functions from the controller:
const {
  register,
  login,
  fetchUser,
  fetchProfile,
  editUser,
} = require('../controllers/authController');

// import the authorization middleware to protect private routes:
const { protect } = require('../middleware/authMiddleware');

// define routes:
router.post('/', register);

router.post('/token', login);

router.get('/', fetchUser);

router.get('/profiles', fetchProfile);

router.put('/edit/handle', protect, editUser);

// router.put('/edit/password', protect, changePassword);

/*
router.put('/profiles/edit', protect, editProfile);

router.put('/follow', protect, followUser);
*/

module.exports = router;
