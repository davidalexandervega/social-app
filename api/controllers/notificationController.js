const notificationModel = require('../models/notificationModel');

// description: create notification
// route: POST /api/notifications/
// access: private
const createNotification = async (req, res) => {
  return notificationModel
    .create({
      id: req.body.id,
      time: req.body.time,
      creatorID: req.body.creatorID,
      creatorUsername: req.body.creatorUsername,
      creatorPictureID: req.body.creatorPictureID,
      recipientID: req.body.recipientID,
      type: req.body.type,
      objectID: req.body.objectID,
    })
    .then((notification) => {
      res.status(201).json(notification.dataValues);
    })
    .catch(() => {
      res.status(500).json({
        error: 'server error',
      });
    });
};

// description: fetch a user's notifications
// route: GET /api/notifications/?userID=
// access: private
const fetchNotifications = (req, res) => {
  notificationModel
    .findAll({
      where: {
        recipientID: req.query.userID,
      },
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(404).json({
        error: 'user notifications not found',
      });
    });
};

// description: check notifications
// route: PUT /api/notifications/?userID=
// access: private
const checkNotifications = (req, res) => {
  notificationModel
    .update(
      { seen: true },
      {
        where: { recipientID: req.query.userID },
      }
    )
    .then(() => {
      notificationModel
        .findAll({
          where: {
            recipientID: req.query.userID,
          },
        })
        .then((response) => {
          console.log(response);
          res.status(200).json(response);
        });
    })
    .catch(() => {
      res.status(500).json({
        error: 'notifications unable to be updated',
      });
    });
};

module.exports = { createNotification, fetchNotifications, checkNotifications };
