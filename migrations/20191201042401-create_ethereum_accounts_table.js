'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ethereum_accounts', {
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id'
        }
      },
      wallet_address: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false
      },
      private_key: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    })
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ethereum_accounts');
  }
};
