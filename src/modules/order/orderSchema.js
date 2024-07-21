const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../user/userSchema');
const Product = require('../product/productSchema');

const Order = sequelize.define('Order', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  deliveryStatus: {
    type: DataTypes.STRING,
    defaultValue: 'not shipped',
  },
});

Order.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = Order;