const Sequelize = require('sequelize');
const sequelize = require('../services/database');


module.exports = sequelize.define('ExchangeBalance', {
    
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
  eth_balance: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: false,
  },
  pia_balance: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: false,
  }
    
}, {
    freezeTableName: true,
    tableName: 'exchange_balances'
});