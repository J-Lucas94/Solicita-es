const express = require('express')
const router = express.Router()

const SolicitacoesController = require('../controller/SolicitacoesController')

router.get('/solicitacao/:id?', SolicitacoesController.solicitacao)
router.post('/solicitacao', SolicitacoesController.solicitacaoPost)
router.get('/lista', SolicitacoesController.lista)

module.exports = router