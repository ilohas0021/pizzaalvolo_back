const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('basket', {
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
    user_sn: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'sn'
      }
    },
    menu_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'menu',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'basket',
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
        name: "fk_basket_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_sn" },
        ]
      },
      {
        name: "fk_basket_menu1_idx",
        using: "BTREE",
        fields: [
          { name: "menu_id" },
        ]
      },
    ]
  });
};
