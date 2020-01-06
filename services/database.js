const Sequelize = require('sequelize');

const {
    MYSQL_DB_NAME: dbName,
    MYSQL_DB_USERNAME: username,
    MYSQL_DB_PASSWORD: password,
    MYSQL_DB_HOST: host
} = process.env;

const sequelize = new Sequelize(dbName, username, password, {
    host: host,
    dialect: 'mysql',
    operatorsAliases: false,
    define: {
        timestamps: false
    }
});

sequelize.authenticate()
    .then(() => { console.log('Database connected'); })
    .catch(err => { console.log('Error: ', err) });

module.exports = sequelize;
