'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('order_statuses', [
      { id: 1, name: 'Submitted' },
      { id: 2, name: 'Processing' },
      { id: 3, name: 'Successful' },
      { id: 4, name: 'Failed' },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('order_statuses');
  }
};
