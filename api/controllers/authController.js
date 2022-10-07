const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '../.env' });

const userModel = require('../models/userModel');

// description: register user
// route: POST /api/users/
// access: public
const register = (req, res) => {
  hashPassword(req.body.password)
    .then((hashedPassword) => {
      return userModel.create({
        id: req.body.id,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        created: req.body.created,
        pictureID: req.body.pictureID,
        bannerID: req.body.bannerID,
        bio: req.body.bio,
        following: req.body.following,
        followers: req.body.followers,
      });
    })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(400).json({
        error: 'invalid user data',
      });
    });
};

// description: authenticate user
// route: POST /api/users/token
// access: public
const login = async (req, res) => {
  const user = await userModel
    .findAll({
      where: {
        username: req.body.username,
      },
    })
    .then((response) => {
      return response[0].dataValues;
    });

  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    res.json(generateToken(user.id));
  } else {
    res.status(400).json({
      error: 'invalid credentials',
    });
  }
};

const fetchUser = async (req, res) => {
  const user = await userModel
    .findAll({
      where: {
        id: req.query.userID,
      },
    })
    .then((response) => {
      return response[0].dataValues;
    });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      error: 'user not found',
    });
  }
};

const fetchProfile = async (req, res) => {
  const user = await userModel
    .findAll({
      where: {
        username: req.query.username,
      },
    })
    .then((response) => {
      return response[0].dataValues;
    });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      error: 'user not found',
    });
  }
};

const hashPassword = async (password, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '30d' });
};

module.exports = {
  register,
  login,
  fetchUser,
  fetchProfile,
};
