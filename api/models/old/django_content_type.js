const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('django_content_type', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    app_label: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "django_content_type_app_label_model_76bd3d3b_uniq"
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "django_content_type_app_label_model_76bd3d3b_uniq"
    }
  }, {
    sequelize,
    tableName: 'django_content_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "django_content_type_app_label_model_76bd3d3b_uniq",
        unique: true,
        fields: [
          { name: "app_label" },
          { name: "model" },
        ]
      },
      {
        name: "django_content_type_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
