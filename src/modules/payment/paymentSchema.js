const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const PaymentSchema = sequelize.define('Payment', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = PaymentSchema;