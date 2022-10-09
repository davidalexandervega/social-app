const replyModel = require('../models/replyModel');

// description: create reply
// route: POST /api/replies/
// access: private
const createReply = async (req, res) => {
  return replyModel
    .create({
      id: req.body.id,
      originID: req.body.originID,
      userID: req.body.userID,
      username: req.body.username,
      userPictureID: req.body.userPictureID,
      body: req.body.body,
      time: req.body.time,
      likes: req.body.likes,
    })
    .then((reply) => {
      res.status(201).json(reply.dataValues);
    })
    .catch(() => {
      res.status(500).json({
        error: 'server error',
      });
    });
};

// description: fetch replies to a post
// route: GET /api/replies/postID?=
// access: public
const fetchReplies = (req, res) => {
  replyModel
    .findAll({ where: { originID: req.query.postID } })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(503).json({
        error: 'server eror',
      });
    });
};

// description: like a reply
// route: PUT /api/replies/like/id?=
// access: private
const likeReply = (req, res) => {
  replyModel
    .update(
      { likes: req.body.likes },
      {
        where: { id: req.body.id },
        returning: true,
        plain: true,
      }
    )
    .then((response) => {
      res.status(200).json(response[1].dataValues);
    })
    .catch(() => {
      res.status(500).json({
        error: 'post unable to be updated',
      });
    });
};

// description: delete a reply
// route: DELETE /api/replies/?id=
// access: public
const deleteReply = (req, res) => {
  replyModel
    .destroy({ where: { id: req.query.id } })
    .then(() => {
      res.status(200).json({
        message: `deleted reply ${req.query.id}`,
      });
    })
    .catch(() => {
      res.status(500).json({
        error: 'replyunable to be deleted',
      });
    });
};

module.exports = { createReply, fetchReplies, likeReply, deleteReply };
