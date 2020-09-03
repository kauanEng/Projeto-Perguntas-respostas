const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING, //curto
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT, //longo
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {
    console.log("Tabela criada");
}); //passagem para tabela ser criada

module.exports = Pergunta;