const Sequelize = require('sequelize');
const database = require('../db');
const Usuario = require('./usuario');

const ContaCorrente = database.define('conta_corrente', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    numero: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    saldo: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    usuarioId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
});

ContaCorrente.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(ContaCorrente, { foreignKey: 'usuarioId' });

module.exports = ContaCorrente;
