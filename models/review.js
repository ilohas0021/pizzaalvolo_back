const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('review', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    info: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
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
    },
    detail_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'detail',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'review',
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
        name: "fk_review_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_sn" },
        ]
      },
      {
        name: "fk_review_menu1_idx",
        using: "BTREE",
        fields: [
          { name: "menu_id" },
        ]
      },
      {
        name: "fk_review_detail1_idx",
        using: "BTREE",
        fields: [
          { name: "detail_id" },
        ]
      },
    ]
  });
};
