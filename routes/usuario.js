const express = require('express')
const user_rotas = express.Router()
const Usuario = require('../models/usuario-model')



user_rotas.get('/', (req, res) => {
    res.render('usuario/missoes')
})

user_rotas.get('/index', (req, res) => {
    res.render('user/index')
})


module.exports = user_rotas