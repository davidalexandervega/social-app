const express = require('express');
const router = express.Router();

// import the interface functions from the controller:
const {
  createReply,
  fetchReplies,
  likeReply,
  deleteReply,
} = require('../controllers/replyController');

// import the authorization middleware to protect private routes:
const { protect } = require('../middleware/authMiddleware');

// define routes:
router.post('/', protect, createReply);

router.get('/', fetchReplies);

router.put('/like', protect, likeReply);

router.delete('/', protect, deleteReply);

module.exports = router;
