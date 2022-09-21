var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const Usuario = db.define('Usuario', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }

})

// User.sync({alter:true})

module.exports = Usuario