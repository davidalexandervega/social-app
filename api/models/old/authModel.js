require('dotenv').config({ path: '../.env' });
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_CONNECTION_URI);

sequelize
  .authenticate()
  .then(() => {
    console.log('sequelize connection establised with postgres database.');
  })
  .catch((err) => {
    console.log(err);
  });
