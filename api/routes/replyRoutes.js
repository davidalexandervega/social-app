const express = require('express');
const router = express.Router();

// import the interface functions from the controller:
const { register } = require('../controllers/');

// import the authorization middleware to protect private routes:
const { protect } = require('../middleware/authMiddleware');

// define routes:
router.post('/', protect, createReply);

router.get('/', fetchReplies);

router.put('/', protect, likeReply);

router.delete('/', protect, deleteReply);
