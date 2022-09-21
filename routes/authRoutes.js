const express = require('express')
const router = express.Router()

const AuthController = require('../controller/AuthController')
const { eAdmin } = require('../helpers/eAdmin')

router.get('/login', AuthController.login)
router.post('/login', AuthController.loginPost)
router.get('/logout',  AuthController.logout)
router.get('/register',  AuthController.register)
router.post('/register',  AuthController.registerPost)


module.exports = router

