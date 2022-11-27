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
      res.status(503).send('server error');
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
    res.status(400).send('invalid credentials');
  }
};

// description: fetch user data via id
// route: GET /api/users/?userID=
// access: public
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
    res.status(404).send('user not found');
  }
};

// description: fetch user data via username
// route: GET /api/users/profiles/?username=
// access: public
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
    res.status(404).send('user not found');
  }
};

// description: edit user profile data
// route: PUT /api/users/profiles/edit
// access: private
const editProfile = async (req, res) => {
  let bannerID, pictureID;

  /*
it's important to note that cloudinary keeps version numbers for images,
which becomes relevant when one with the same public id (aka filename) is replaced.
if the version number is not supplied on render, cloudinary will render
whatever image has last been cached by the browser.
therefore, a user's pictureID and bannerID correspond to the version number
provided on upload. if there is no picture, then the id is set to the user's id.
this is in order to allow the pictureID and bannerID fields to be used as
foreign keys in the database, and therefore cascade updates to objects
(such as posts) when the user's information is updated.
  */

  if (req.files.banner) {
    // extract the version number from the upload path:
    bannerID = req.files.banner[0].path.split('/upload/v')[1].split('/')[0];
  } else if (req.body.banner === req.body.userID) {
    // if the banner id is the user id, then there's no banner or it needs to be deleted:
    await cloudinary.uploader.destroy(`social-app/banners/${req.body.userID}`);
    bannerID = req.body.userID;
  } else {
    // if an existing version number was sent in the request, then no change:
    bannerID = req.body.banner;
  }

  if (req.files.picture) {
    // extract the version number from the upload path:
    pictureID = req.files.picture[0].path.split('/upload/v')[1].split('/')[0];
  } else if (req.body.picture === req.body.userID) {
    // if the picture id is the user id, then there's no profile picture or it needs to be deleted:
    await cloudinary.uploader.destroy(`social-app/pictures/${req.body.userID}`);
    pictureID = req.body.userID;
  } else {
    // if an existing version number was sent in the request, then no change:
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
      res.status(200).json(response[1].dataValues);
    })
    .catch((err) => {
      res.status(500).send('user unable to be updated');
    });
};

// description: edit user login data
// route: PUT /api/users/edit/handle?username=
// access: private
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
    // if the request body has a new username specified,
    // check if it is already taken:
    let alreadyTaken = false;
    if (req.body.newUsername !== req.body.username) {
      alreadyTaken = await userModel
        .findAll({
          where: {
            username: req.body.newUsername,
          },
        })
        .then((response) => {
          if (response.length > 0) return true;
        });

      if (alreadyTaken) res.status(401).send('username already taken');
    }

    if (req.body.newUsername === req.body.username || !alreadyTaken) {
      userModel
        .update(
          {
            email: req.body.newEmail,
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
    }
  } else {
    res.status(401).send('incorrect password');
  }
};

// description: change user password
// route: PUT /api/users/edit/password?username=
// access: private
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

// description: follow or unfollow a user
// route: PUT /api/users/follow
// access: private
const followUser = async (req, res) => {
  const creator = await userModel
    .findAll({
      where: {
        id: req.body.creatorID,
      },
    })
    .then((response) => {
      return response[0].dataValues;
    });

  const target = await userModel
    .findAll({
      where: {
        id: req.body.targetID,
      },
    })
    .then((response) => {
      return response[0].dataValues;
    });

  const following = [...creator.following];
  const followers = [...target.followers];
  if (followers.includes(req.body.creatorID)) {
    followers.splice(followers.indexOf(req.body.creatorID), 1);
    userModel.update(
      {
        followers: followers,
      },
      { where: { id: req.body.targetID }, returning: true, plain: true }
    );
    following.splice(followers.indexOf(req.body.targetID), 1);
    userModel
      .update(
        {
          following: following,
        },
        { where: { id: req.body.creatorID }, returning: true, plain: true }
      )
      .then((response) => {
        res.status(200).json(response[1].dataValues);
      });
  } else {
    followers.push(req.body.creatorID);
    userModel.update(
      {
        followers: followers,
      },
      { where: { id: req.body.targetID }, returning: true, plain: true }
    );
    following.push(req.body.targetID);
    userModel
      .update(
        {
          following: following,
        },
        { where: { id: req.body.creatorID }, returning: true, plain: true }
      )
      .then((response) => {
        res.status(200).json(response[1].dataValues);
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
  editProfile,
  editUser,
  changePassword,
  followUser,
};
