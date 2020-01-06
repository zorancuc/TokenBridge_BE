const Sequelize = require('sequelize');
const sequelize = require('../services/database');

module.exports = sequelize.define('TokenType', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: 'token_types'
});