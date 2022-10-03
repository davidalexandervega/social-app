const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schema_version', {
    ver: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'schema_version',
    schema: 'graphql',
    timestamps: false,
    indexes: [
      {
        name: "schema_version_pkey",
        unique: true,
        fields: [
          { name: "ver" },
        ]
      },
    ]
  });
};
