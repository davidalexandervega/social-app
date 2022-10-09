const express = require('express');
const router = express.Router();

// import the interface functions from the controller:
const {
  createNotification,
  fetchNotifications,
  checkNotifications,
} = require('../controllers/notificationController');

// import the authorization middleware to protect private routes:
const { protect } = require('../middleware/authMiddleware');

// define routes:
router.post('/', protect, createNotification);

router.get('/', protect, fetchNotifications);

router.put('/', protect, checkNotifications);

module.exports = router;
