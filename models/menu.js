const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    img_url: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    regdate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'menu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
