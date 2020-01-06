const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../services/database');

const PROTECTED_ATTRIBUTES = ['password', 'token'];

module.exports = sequelize.define('User', {
    
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    wallet_id: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
        validate: {
            len: [3, 16]
        }
    },
    password: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            len: [6, 50]
        }
    },
    first_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
    
}, {
    freezeTableName: true,
    tableName: 'users',
    hooks: {
        beforeCreate: async (instance) => {
            let hash = await bcrypt.hash(instance.get('password'), parseInt(process.env.BCRYPT_SALT));
            instance.set('password', hash);
        }
    },
    instanceMethods: {
        toJSON: function () {
            let attributes = Object.assign({}, this.get())
            for (let a of PROTECTED_ATTRIBUTES) {
                delete attributes[a]
            }
            return attributes;
        }
    }
});