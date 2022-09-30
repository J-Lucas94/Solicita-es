const express = require('express')
const router = express.Router()

const SolicitacoesController = require('../controller/SolicitacoesController')
const AuthController = require('../controller/AuthController')
const { eAdmin } = require('../helpers/eAdmin')


router.get('/', eAdmin, SolicitacoesController.home)
router.get('/solicitacao/:numero?', eAdmin, SolicitacoesController.solicitacao)
router.get('/itemGet/',eAdmin, SolicitacoesController.itemGet)
router.post('/solicitacao',eAdmin, SolicitacoesController.solicitacaoPost)
router.get('/remove/:numero?/:item',eAdmin, SolicitacoesController.removeItem)
router.get('/removes/:numero?',eAdmin, SolicitacoesController.removeSolicitacao)
router.get('/lista/:status?',eAdmin, SolicitacoesController.lista)

router.get('/login', AuthController.login)
router.post('/login', AuthController.loginPost)
router.get('/logout',eAdmin,  AuthController.logout)
router.get('/registrar', AuthController.registrar) 
router.post('/registrar',eAdmin, AuthController.registrarPost)
router.get('/listausuarios',eAdmin, AuthController.listaUsuario)
router.get('/editarusuario/:id',  AuthController.editarUsuario)
router.post('/editarusuario/:id',  AuthController.editarUsuarioPost)
router.get('/editar/:id',  AuthController.editarSenha)
router.post('/editar/:id',  AuthController.editarSenhaPost)
router.get('/deletar/:id', AuthController.deletarUsuario)


module.exports = router