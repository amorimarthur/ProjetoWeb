const Sequelize = require('sequelize');
const database = require('../db');
const Pessoa = require('./pessoa');

const Usuario = database.define('usuario', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pessoaId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      references: {
          model: Pessoa,
          key: 'id'
      }
  }
});

Usuario.belongsTo(Pessoa, { foreignKey: 'pessoaId', unique: true });
Pessoa.hasOne(Usuario, { foreignKey: 'pessoaId' });

module.exports = Usuario;
