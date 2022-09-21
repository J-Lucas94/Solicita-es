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

    descrição: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    quantidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    observação: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    data_necessidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    data_entrega: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    obs_entrega: {
        type: DataTypes.STRING,
        allowNull: false,
    },

})

// db.sync({force:true})

module.exports = Solicitacao