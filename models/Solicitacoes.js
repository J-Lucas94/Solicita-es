var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const Solicitacao = db.define('Solicitacao', {
    
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    usuario_solicitante : {
        type: DataTypes.STRING,
        allowNull: false,
    },

    item: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    quantidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    observacao: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    data_necessidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    data_entrega: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    obs_entrega: {
        type: DataTypes.STRING,
        allowNull: true,
    },

})

// db.sync({alter:true})

module.exports = Solicitacao