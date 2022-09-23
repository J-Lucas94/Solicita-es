const express = require('express')
const router = express.Router()

const SolicitacoesController = require('../controller/SolicitacoesController')

router.get('/solicitacao/:numero?', SolicitacoesController.solicitacao)
router.get('/itemGet/', SolicitacoesController.itemGet)
router.post('/solicitacao', SolicitacoesController.solicitacaoPost)
router.get('/remove/:numero?/:item', SolicitacoesController.removeItem)
router.get('/removes/:numero?', SolicitacoesController.removeSolicitacao)
router.get('/lista', SolicitacoesController.lista)

module.exports = router