const express = require('express')
const router = express.Router()

const SolicitacoesController = require('../controller/SolicitacoesController')
const { eAdmin } = require('../helpers/eAdmin')
router.get('/solicitacao/:numero?',eAdmin, SolicitacoesController.solicitacao)
router.get('/itemGet/',eAdmin, SolicitacoesController.itemGet)
router.post('/solicitacao',eAdmin, SolicitacoesController.solicitacaoPost)
router.get('/remove/:numero?/:item',eAdmin, SolicitacoesController.removeItem)
router.get('/removes/:numero?',eAdmin, SolicitacoesController.removeSolicitacao)
router.get('/lista',eAdmin, SolicitacoesController.lista)

module.exports = router