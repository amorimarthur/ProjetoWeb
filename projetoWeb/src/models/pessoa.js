const Sequelize = require('sequelize');
const database = require('../db');
 
const Pessoa = database.define('pessoa', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    endereco: {
        type: Sequelize.CHAR(255),
        allowNull: false,
    },
    cep: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },

})
 
module.exports = Pessoa;