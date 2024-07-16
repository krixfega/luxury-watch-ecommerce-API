const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const ProductSchema = require('../product/productSchema');
const UserSchema = require('../user/userSchema');

const ReviewSchema = sequelize.define('Review', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductSchema,
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserSchema,
      key: 'id',
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = ReviewSchema;