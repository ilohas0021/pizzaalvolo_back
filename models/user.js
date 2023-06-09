const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    sn: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "id_UNIQUE"
    },
    pw: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    authority: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sn" },
        ]
      },
      {
        name: "id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
