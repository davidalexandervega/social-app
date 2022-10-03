const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('_type', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type_kind: {
      type: DataTypes.ENUM("SCALAR","OBJECT","INTERFACE","UNION","ENUM","INPUT_OBJECT","LIST","NON_NULL"),
      allowNull: false
    },
    meta_kind: {
      type: DataTypes.ENUM("__Schema","__Type","__TypeKind","__Field","__InputValue","__EnumValue","__Directive","__DirectiveLocation","ID","Float","String","Int","Boolean","Date","Time","Datetime","BigInt","UUID","JSON","OrderByDirection","PageInfo","Cursor","Query","Mutation","Interface","Node","Edge","Connection","OrderBy","FilterEntity","InsertNode","UpdateNode","InsertNodeResponse","UpdateNodeResponse","DeleteNodeResponse","FilterType","Enum"),
      allowNull: false
    },
    is_builtin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    constant_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    entity: {
      type: "REGCLASS",
      allowNull: true
    },
    graphql_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    enum: {
      type: "REGTYPE",
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: '_type',
    schema: 'graphql',
    timestamps: false,
    indexes: [
      {
        name: "_type_meta_kind_entity_key",
        unique: true,
        fields: [
          { name: "meta_kind" },
          { name: "entity" },
        ]
      },
      {
        name: "_type_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "ix_graphql_type_graphql_type_id",
        fields: [
          { name: "graphql_type_id" },
        ]
      },
      {
        name: "ix_graphql_type_meta_kind",
        fields: [
          { name: "meta_kind" },
        ]
      },
      {
        name: "ix_graphql_type_name",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "ix_graphql_type_name_regex",
        fields: [
        ]
      },
      {
        name: "ix_graphql_type_type_kind",
        fields: [
          { name: "type_kind" },
        ]
      },
    ]
  });
};
