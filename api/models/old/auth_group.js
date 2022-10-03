const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auth_group', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: "auth_group_name_key"
    }
  }, {
    sequelize,
    tableName: 'auth_group',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "auth_group_name_a6ea08ec_like",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "auth_group_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "auth_group_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
