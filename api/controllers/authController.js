require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// configure cloudinary for cloud querying:
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
      res.status(201).json(user.dataValues);
    })
    .catch(() => {
      res.status(503).json({
        error: 'server error',
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

const editProfile = async (req, res) => {
  let bannerID, pictureID;

  console.log('request files:', req.files);

  if (req.files.banner) {
    // extract the version number from the upload path:
    bannerID = req.files.banner[0].path.split('/upload/v')[1].split('/')[0];
  } else if (req.body.banner === req.body.userID) {
    await cloudinary.uploader.destroy(`social-app/banners/${req.body.userID}`);
    bannerID = req.body.userID;
  } else {
    bannerID = req.body.banner;
  }

  if (req.files.picture) {
    // extract the version number from the upload path:
    pictureID = req.files.picture[0].path.split('/upload/v')[1].split('/')[0];
  } else if (req.body.picture === req.body.userID) {
    await cloudinary.uploader.destroy(`social-app/pictures/${req.body.userID}`);
    pictureID = req.body.userID;
  } else {
    pictureID = req.body.picture;
  }

  userModel
    .update(
      {
        bannerID: bannerID,
        pictureID: pictureID,
        bio: req.body.bio,
      },
      {
        where: { id: req.body.userID },
        returning: true,
        plain: true,
      }
    )
    .then((response) => {
      console.log(response[1].dataValues);
      res.status(200).json(response[1].dataValues);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('user unable to be updated');
    });
};

const editUser = async (req, res) => {
  const user = await userModel
    .findAll({
      where: {
        id: req.body.userID,
      },
    })
    .then((response) => {
      return response[0].dataValues;
    });

  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    userModel
      .update(
        {
          email: req.body.email,
          username: req.body.newUsername,
        },
        {
          where: { id: req.body.userID },
          returning: true,
          plain: true,
        }
      )
      .then((response) => {
        res.status(200).json(response[1].dataValues);
      })
      .catch(() => {
        res.status(500).send('user unable to be updated');
      });
  } else {
    res.status(401).send('incorrect username or password');
  }
};

const changePassword = async (req, res) => {
  const user = await userModel
    .findAll({
      where: {
        id: req.body.userID,
      },
    })
    .then((response) => {
      return response[0].dataValues;
    });

  if (user && (await bcrypt.compare(req.body.currentPassword, user.password))) {
    hashPassword(req.body.newPassword).then((hashedPassword) => {
      userModel
        .update(
          {
            password: hashedPassword,
          },
          { where: { id: req.body.userID } }
        )
        .then(() => {
          res.status(200).send('password changed');
        })
        .catch(() => {
          res.status(503).send('server error');
        });
    });
  } else {
    res.status(401).send('incorrect password');
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
  editProfile,
  editUser,
  changePassword,
};
