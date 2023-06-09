const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    regdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    menu_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'menu',
        key: 'id'
      }
    },
    total_order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'total_order',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'detail',
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
      {
        name: "fk_detail_pizza1_idx",
        using: "BTREE",
        fields: [
          { name: "menu_id" },
        ]
      },
      {
        name: "fk_detail_total_order1_idx",
        using: "BTREE",
        fields: [
          { name: "total_order_id" },
        ]
      },
    ]
  });
};
