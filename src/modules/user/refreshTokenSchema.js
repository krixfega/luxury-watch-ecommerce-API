const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./userSchema');

const RefreshToken = sequelize.define('RefreshToken', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = RefreshToken;