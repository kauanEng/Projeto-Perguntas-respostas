const Sequelize = require('sequelize');

const connection = new Sequelize('sistemaDeCadastro','kauan','705324',{
    host: 'localhost',
    dialect:'mysql'
});
module.exports = connection;