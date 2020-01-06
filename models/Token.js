const Sequelize = require('sequelize');
const sequelize = require('../services/database');

module.exports = sequelize.define('Token', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    type_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
            model: 'token_types', 
            key: 'id'
        }
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    symbol: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    token_address: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: 'tokens'
});