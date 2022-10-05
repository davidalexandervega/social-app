const express = require('express');
const router = express.Router();

// import the interface functions from the controller:
const { register } = require('../controllers/');

// import the authorization middleware to protect private routes:
const { protect } = require('../middleware/authMiddleware');

// define routes:
router.post('/', register);

router.post('/token', login);

router.get('/', fetchUser);

router.get('/profiles', fetchProfile);

router.put('/profiles/edit', protect, editProfile);

router.put('/edit/handle', protect, editUser);

router.put('/edit/password', protect, changePassword);

router.put('/follow', protect, followUser);
