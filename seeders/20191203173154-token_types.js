'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('token_types', [
      { id: 1, name: 'eth' },
      { id: 2, name: 'pia' },
      { id: 3, name: 'fiat' },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('token_types');
  }
};
