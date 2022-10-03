const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buckets', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    owner: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'buckets',
    schema: 'storage',
    timestamps: true,
    indexes: [
      {
        name: "bname",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "buckets_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
