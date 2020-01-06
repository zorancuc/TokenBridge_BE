const Sequelize = require('sequelize');
const sequelize = require('../services/database');

module.exports = sequelize.define('Transaction', {
    id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    transaction_code: {
        type: Sequelize.STRING(20)
    },
    user_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        }
    },
    type: {
        type: Sequelize.ENUM,
        values: ['credit', 'debit']
    },
    token_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
            model: 'tokens', 
            key: 'id'
        }
    },
    quantity: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: true
    },
    reference_table_name: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    reference_table_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: true
    },
}, {
    freezeTableName: true,
    tableName: 'transactions'
});