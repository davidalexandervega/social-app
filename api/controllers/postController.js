require('dotenv').config({ path: '../.env' });

const postModel = require('../models/postModel');

// description: create post
// route: POST /api/posts/
// access: private
const createPost = async (req, res) => {
  return postModel
    .create({
      id: req.body.id,
      userID: req.body.userID,
      username: req.body.username,
      userPictureID: req.body.userPictureID,
      body: req.body.body,
      time: req.body.time,
      likes: req.body.likes,
      replies: req.body.replies,
      image: req.body.image,
    })
    .then((post) => {
      res.status(201).json(post.dataValues);
    })
    .catch(() => {
      res.status(500).json({
        error: 'server error',
      });
    });
};

// description: fetch all posts
// route: GET /api/posts/all
// access: public
const fetchAllPosts = (req, res) => {
  postModel
    .findAll()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(503).json({
        error: 'server eror',
      });
    });
};

// description: fetch a user's posts
// route: GET /api/posts/user/?username=
// access: public
const fetchUserPosts = (req, res) => {
  postModel
    .findAll({
      where: {
        username: req.query.username,
      },
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(404).json({
        error: 'user posts not found',
      });
    });
};

// description: fetch a single post by id
// route: GET /api/posts/?id=
// access: public
const fetchPostByID = (req, res) => {
  postModel
    .findAll({
      where: {
        id: req.query.id,
      },
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(404).json({
        error: 'post not found',
      });
    });
};

// description: like a post
// route: PUT /api/posts/like/id?=
// access: private
const likePost = (req, res) => {
  postModel
    .update({ likes: req.body.likes }, { where: { id: req.body.id } })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(500).json({
        error: 'post unable to be updated',
      });
    });
};

// description: delete a post
// route: DELETE /api/posts/?id=
// access: public
const deletePost = (req, res) => {
  postModel
    .destroy({ where: { id: req.query.id } })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(500).json({
        error: 'post unable to be deleted',
      });
    });
};

module.exports = { createPost, fetchAllPosts, fetchUserPosts, fetchPostByID, likePost, deletePost };
