const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('app_user_groups', {
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
      unique: "app_user_groups_user_id_group_id_73b8e940_uniq"
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'auth_group',
        key: 'id'
      },
      unique: "app_user_groups_user_id_group_id_73b8e940_uniq"
    }
  }, {
    sequelize,
    tableName: 'app_user_groups',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "app_user_groups_group_id_e774d92c",
        fields: [
          { name: "group_id" },
        ]
      },
      {
        name: "app_user_groups_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "app_user_groups_user_id_e6f878f6",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "app_user_groups_user_id_group_id_73b8e940_uniq",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "group_id" },
        ]
      },
    ]
  });
};
