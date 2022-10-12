require('dotenv').config({ path: '../.env' });
const Sequelize = require('sequelize');

/*
PROCEDURE FOR MAKING CHANGES TO THE MODEL:

first, un-comment the {whatever}.sync() operation at the bottom of the file.
remember to re-comment it after the update.

if a column/constraint is simply being added or removed from a table,
altering this file & running `node {whatever}Model.js` is enough.
this will run the sequelize instance and perform the {whatever}.sync({alter: true})
operation at the bottom of the file. 

if a column or the table itself is being renamed,
first change the name using (preferably) the database's GUI or if not then a raw SQL query,
then also rename the table/columns & relevant constraints here,
and finally run `node {whatever}Model.js` to ensure that this file is always the most current document.
remember that renaming a column that is referenced by another table requires altering the constraint
in that model's file and running `node {whatever}Model.js` for that file too.
*/

const sequelize = new Sequelize(process.env.DB_CONNECTION_URI);

const replyModel = sequelize.define(
  'reply',
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    body: {
      type: Sequelize.DataTypes.STRING(200),
      allowNull: false,
    },
    time: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    likes: {
      type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.UUID),
      allowNull: false,
    },
    originID: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    userID: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    username: {
      type: Sequelize.DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'users',
        key: 'username',
      },
      onUpdate: 'CASCADE',
    },
    userPictureID: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'users',
        key: 'pictureID',
        allowNull: false,
      },
      onUpdate: 'CASCADE',
    },
    /*
    username: {
      type: Sequelize.DataTypes.STRING(200),
      allowNull: false,
    },
    userPictureID: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    */
  },
  {
    sequelize,
    tableName: 'replies',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'reply_pkey',
        unique: true,
        fields: [{ name: 'id' }],
      },
      {
        name: 'reply_originID',
        fields: [{ name: 'originID' }],
      },
      {
        name: 'reply_userID',
        fields: [{ name: 'userID' }],
      },
      {
        name: 'reply_username',
        fields: [{ name: 'username' }],
      },
      {
        name: 'reply_userPictureID',
        fields: [{ name: 'userPictureID' }],
      },
    ],
  }
);

/*
replyModel
  .sync({ alter: true })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
*/

module.exports = replyModel;
