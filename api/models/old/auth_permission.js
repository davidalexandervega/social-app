const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auth_permission', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'django_content_type',
        key: 'id'
      },
      unique: "auth_permission_content_type_id_codename_01ab375a_uniq"
    },
    codename: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "auth_permission_content_type_id_codename_01ab375a_uniq"
    }
  }, {
    sequelize,
    tableName: 'auth_permission',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "auth_permission_content_type_id_2f476e4b",
        fields: [
          { name: "content_type_id" },
        ]
      },
      {
        name: "auth_permission_content_type_id_codename_01ab375a_uniq",
        unique: true,
        fields: [
          { name: "content_type_id" },
          { name: "codename" },
        ]
      },
      {
        name: "auth_permission_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
