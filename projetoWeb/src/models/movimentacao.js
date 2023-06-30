const Sequelize = require('sequelize');
const database = require('../db');
const ContaCorrente = require('./contaCorrente');

const Movimentacao = database.define('movimentacao', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    observacao: {
      type: Sequelize.CHAR,
      allowNull: true,
    },
    contaOrigem: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    contaDestino: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    dataMovimento: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    valor: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    tipo: {
        type: Sequelize.ENUM('C', 'D'),
        allowNull: false
    },
    contaCorrenteId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: ContaCorrente,
            key: 'id'
        }
    }
});

Movimentacao.belongsTo(ContaCorrente, { foreignKey: 'contaCorrenteId' });
ContaCorrente.hasMany(Movimentacao, { foreignKey: 'contaCorrenteId' });

module.exports = Movimentacao;
