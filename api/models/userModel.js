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

const userModel = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.DataTypes.STRING(765),
      allowNull: false,
    },
    username: {
      type: Sequelize.DataTypes.STRING(765),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    bio: {
      type: Sequelize.DataTypes.STRING(200),
      allowNull: false,
    },
    following: {
      type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.UUID),
      allowNull: false,
    },
    followers: {
      type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.UUID),
      allowNull: false,
    },
    created: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    bannerID: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    pictureID: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'user_pkey',
        unique: true,
        fields: [{ name: 'id' }],
      },
    ],
  }
);

/*
userModel
  .sync({ alter: true })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
*/

module.exports = userModel;
