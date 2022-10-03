const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('app_post', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
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
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'app_user',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    replies: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false
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
    tableName: 'app_post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "app_post_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "app_post_user_id_c2bbada6",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
