const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('app_notification', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    object: {
      type: DataTypes.UUID,
      allowNull: false
    },
    creatorID_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'app_user',
        key: 'id'
      }
    },
    recipientID_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'app_user',
        key: 'id'
      }
    },
    creatorUsername: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    seen: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    creatorPictureID: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'app_notification',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "app_notification_creator_id_b3d1ebd5",
        fields: [
          { name: "creatorID_id" },
        ]
      },
      {
        name: "app_notification_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "app_notification_target_id_ec40e651",
        fields: [
          { name: "recipientID_id" },
        ]
      },
    ]
  });
};
