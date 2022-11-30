const replyModel = require('../models/replyModel');
const postModel = require('../models/postModel');
// description: create reply
// route: POST /api/replies/
// access: private
const createReply = async (req, res) => {
  // first, add the id of the reply to the origin post's replies array:
  const origin = await postModel
    .findAll({
      where: {
        id: req.body.originID,
      },
    })
    .then((response) => {
      return response[0].dataValues;
    });

  const replies = [...origin.replies];
  replies.push(req.body.id);

  postModel.update(
    {
      replies: replies,
    },
    { where: { id: req.body.originID } }
  );

  // now, formally create the reply:
  replyModel
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
      res.status(500).send('server error');
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
      res.status(503).send('server error');
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
      res.status(500).send('reply unable to be updated');
    });
};

// description: delete a reply
// route: DELETE /api/replies/?id=
// access: public
const deleteReply = async (req, res) => {
  // first, delete the id of the reply to the origin post's replies array:
  const reply = await replyModel
    .findAll({
      where: {
        id: req.query.id,
      },
    })
    .then((response) => {
      return response[0].dataValues;
    });
  const origin = await postModel
    .findAll({
      where: {
        id: reply.originID,
      },
    })
    .then((response) => {
      return response[0].dataValues;
    });
  replies = [...origin.replies];
  replies.splice(replies.indexOf(req.query.id), 1);
  postModel.update(
    {
      replies: replies,
    },
    { where: { id: reply.originID } }
  );

  // now, formally delete the reply:
  replyModel
    .destroy({ where: { id: req.query.id } })
    .then(() => {
      res.status(200).json({
        message: `deleted reply ${req.query.id}`,
      });
    })
    .catch(() => {
      res.status(500).send('reply unable to be deleted');
    });
};

module.exports = { createReply, fetchReplies, likeReply, deleteReply };
