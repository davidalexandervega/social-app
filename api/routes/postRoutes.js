const express = require('express');
const router = express.Router();

// import the interface functions from the controller:
const { register } = require('../controllers/');

// import the authorization middleware to protect private routes:
const { protect } = require('../middleware/authMiddleware');

// define routes:
router.post('/', protect, createPost);

router.get('/all', fetchAllPosts);

router.get('/user', fetchUserPosts);

router.get('/id', fetchPostByID);

router.put('/like', protect, likePost);

router.delete('/', protect, deletePost);
