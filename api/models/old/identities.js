const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('identities', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    identity_data: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    provider: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    last_sign_in_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'identities',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "identities_pkey",
        unique: true,
        fields: [
          { name: "provider" },
          { name: "id" },
        ]
      },
      {
        name: "identities_user_id_idx",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
