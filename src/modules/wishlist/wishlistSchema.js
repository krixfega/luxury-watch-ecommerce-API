const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../user/userSchema');
const Product = require('../product/productSchema');

const Wishlist = sequelize.define('Wishlist', {
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
});

module.exports = Wishlist;