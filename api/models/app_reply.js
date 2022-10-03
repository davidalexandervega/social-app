const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('app_reply', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false
    },
    origin_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'app_post',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'app_user',
        key: 'id'
      }
    },
    username: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    userPictureID: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'app_reply',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "app_reply_origin_id_589ff682",
        fields: [
          { name: "origin_id" },
        ]
      },
      {
        name: "app_reply_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "app_reply_user_id_9166edce",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
