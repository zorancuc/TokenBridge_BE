const Sequelize = require('sequelize');
const sequelize = require('../services/database');

module.exports = sequelize.define('ExchangeOrder', {
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
}, {
    freezeTableName: true,
    tableName: 'exchange_orders'
});