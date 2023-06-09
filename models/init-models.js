var DataTypes = require("sequelize").DataTypes;
var _basket = require("./basket");
var _detail = require("./detail");
var _menu = require("./menu");
var _review = require("./review");
var _total_order = require("./total_order");
var _user = require("./user");

function initModels(sequelize) {
  var basket = _basket(sequelize, DataTypes);
  var detail = _detail(sequelize, DataTypes);
  var menu = _menu(sequelize, DataTypes);
  var review = _review(sequelize, DataTypes);
  var total_order = _total_order(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  review.belongsTo(detail, { as: "detail", foreignKey: "detail_id"});
  detail.hasMany(review, { as: "reviews", foreignKey: "detail_id"});
  basket.belongsTo(menu, { as: "menu", foreignKey: "menu_id"});
  menu.hasMany(basket, { as: "baskets", foreignKey: "menu_id"});
  detail.belongsTo(menu, { as: "menu", foreignKey: "menu_id"});
  menu.hasMany(detail, { as: "details", foreignKey: "menu_id"});
  review.belongsTo(menu, { as: "menu", foreignKey: "menu_id"});
  menu.hasMany(review, { as: "reviews", foreignKey: "menu_id"});
  detail.belongsTo(total_order, { as: "total_order", foreignKey: "total_order_id"});
  total_order.hasMany(detail, { as: "details", foreignKey: "total_order_id"});
  basket.belongsTo(user, { as: "user_sn_user", foreignKey: "user_sn"});
  user.hasMany(basket, { as: "baskets", foreignKey: "user_sn"});
  review.belongsTo(user, { as: "user_sn_user", foreignKey: "user_sn"});
  user.hasMany(review, { as: "reviews", foreignKey: "user_sn"});
  total_order.belongsTo(user, { as: "user_sn_user", foreignKey: "user_sn"});
  user.hasMany(total_order, { as: "total_orders", foreignKey: "user_sn"});

  return {
    basket,
    detail,
    menu,
    review,
    total_order,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
