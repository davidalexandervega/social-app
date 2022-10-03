const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('_field', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    parent_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    meta_kind: {
      type: DataTypes.ENUM("Constant","Query.collection","Column","Relationship.toMany","Relationship.toOne","OrderBy.Column","Filter.Column","Function","Mutation.insert","Mutation.delete","Mutation.update","UpdateSetArg","ObjectsArg","AtMostArg","Query.heartbeat","Query.__schema","Query.__type","__Typename"),
      allowNull: true,
      defaultValue: "Constant"
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    constant_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parent_arg_field_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    default_value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    entity: {
      type: "REGCLASS",
      allowNull: true
    },
    column_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    column_attribute_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    column_type: {
      type: "REGTYPE",
      allowNull: true
    },
    local_columns: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    foreign_columns: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    foreign_entity: {
      type: "REGCLASS",
      allowNull: true
    },
    foreign_name_override: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    func: {
      type: "REGPROC",
      allowNull: true
    },
    is_not_null: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_array: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_array_not_null: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_arg: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    is_hidden_from_schema: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: '_field',
    schema: 'graphql',
    timestamps: false,
    indexes: [
      {
        name: "_field_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "ix_graphql_field_entity",
        fields: [
          { name: "entity" },
        ]
      },
      {
        name: "ix_graphql_field_meta_kind",
        fields: [
          { name: "meta_kind" },
        ]
      },
      {
        name: "ix_graphql_field_name_regex",
        fields: [
        ]
      },
      {
        name: "ix_graphql_field_parent_arg_field_id",
        fields: [
          { name: "parent_arg_field_id" },
        ]
      },
      {
        name: "ix_graphql_field_parent_type_id",
        fields: [
          { name: "parent_type_id" },
        ]
      },
      {
        name: "ix_graphql_field_type_id",
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  });
};
