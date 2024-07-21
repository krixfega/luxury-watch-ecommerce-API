'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'deliveryStatus', {
      type: Sequelize.STRING,
      defaultValue: 'not shipped',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'deliveryStatus');
  }
};