const express = require('express')
const router = express.Router()

const SolicitacoesController = require('../controller/SolicitacoesController')

router.get('/solicitacao', SolicitacoesController.solicitacao)

module.exports = router