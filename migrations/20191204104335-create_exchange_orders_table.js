'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exhange_orders', {
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      sender_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id'
        }
      },
      send_token_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: 'tokens', 
          key: 'id'
        }
      },
      send_quantity: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      receiver_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id'
        }
      },
      receive_token_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: 'tokens', 
          key: 'id'
        }
      },
      receive_quantity: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      exchange_rate: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      status_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: 'order_statuses', 
          key: 'id'
        }
      },
      status_comment: {
        type: Sequelize.STRING,
        allowNull: true
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
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('exhange_orders');
  }
};
