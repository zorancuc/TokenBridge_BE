const Sequelize = require('sequelize');
const sequelize = require('../services/database');


module.exports = sequelize.define('FuturepiaAccount', {
    
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
    wallet_id: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            len: [6, 50]
        }
    }
    
}, {
    freezeTableName: true,
    tableName: 'futurepia_accounts'
});