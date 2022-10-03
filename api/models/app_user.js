const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'app_user',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(765),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(765),
        allowNull: false,
        unique: 'app_user_username_key',
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      following: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
      },
      followers: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      bannerID: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pictureID: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'app_user',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'app_user_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'app_user_username_9d6296ff_like',
          fields: [{ name: 'username' }],
        },
        {
          name: 'app_user_username_key',
          unique: true,
          fields: [{ name: 'username' }],
        },
      ],
    }
  );
};
