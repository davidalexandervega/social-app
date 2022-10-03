const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('django_session', {
    session_key: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true
    },
    session_data: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    expire_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'django_session',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "django_session_expire_date_a5c62663",
        fields: [
          { name: "expire_date" },
        ]
      },
      {
        name: "django_session_pkey",
        unique: true,
        fields: [
          { name: "session_key" },
        ]
      },
      {
        name: "django_session_session_key_c0390e0f_like",
        fields: [
          { name: "session_key" },
        ]
      },
    ]
  });
};
