const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.development.url, {
  dialect: 'postgres',
});

module.exports = sequelize;