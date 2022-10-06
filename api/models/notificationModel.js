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

const notification = sequelize.define(
  'notification',
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: Sequelize.DataTypes.STRING(200),
      allowNull: false,
    },
    object: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
    },
    creatorID: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    recipientID: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    creatorUsername: {
      type: Sequelize.DataTypes.STRING(200),
      allowNull: false,
    },
    time: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    seen: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },
    creatorPictureID: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'notifications',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'notification_creatorID',
        fields: [{ name: 'creatorID' }],
      },
      {
        name: 'notification_pkey',
        unique: true,
        fields: [{ name: 'id' }],
      },
      {
        name: 'notification_recipientID',
        fields: [{ name: 'recipientID' }],
      },
    ],
  }
);

notification
  .sync({ alter: true })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
