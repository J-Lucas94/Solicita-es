const express = require('express')
const router = express.Router()

const AuthController = require('../controller/AuthController')
const { eAdmin } = require('../helpers/eAdmin')

router.get('/login', AuthController.login)
router.post('/login', AuthController.loginPost)
router.get('/logout',eAdmin, AuthController.logout)
router.get('/registrar/:id?',eAdmin, AuthController.registrar)
// router.get('/editar/:id',eAdmin, AuthController.editUsuario)
// router.post('/editar/:id?',eAdmin, AuthController.editUsuarioPost)
router.get('/listausuarios',eAdmin, AuthController.listaUsuario)
router.post('/registrar',eAdmin, AuthController.registrarPost)
router.get('/deletar/:id', AuthController.deletarUsuario)


module.exports = router

