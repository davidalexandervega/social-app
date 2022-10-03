const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('app_user_user_permissions', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'app_user',
        key: 'id'
      },
      unique: "app_user_user_permissions_user_id_permission_id_7c8316ce_uniq"
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'auth_permission',
        key: 'id'
      },
      unique: "app_user_user_permissions_user_id_permission_id_7c8316ce_uniq"
    }
  }, {
    sequelize,
    tableName: 'app_user_user_permissions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "app_user_user_permissions_permission_id_4ef8e133",
        fields: [
          { name: "permission_id" },
        ]
      },
      {
        name: "app_user_user_permissions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "app_user_user_permissions_user_id_24780b52",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "app_user_user_permissions_user_id_permission_id_7c8316ce_uniq",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "permission_id" },
        ]
      },
    ]
  });
};
