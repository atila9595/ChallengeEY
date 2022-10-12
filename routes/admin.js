const express = require('express')
const admin_rotas = express.Router()
const missao = require('../models/missao-model')

admin_rotas.get('/cadmissao', async(req, res) => {


    res.render('admin/cadastro-missao')


})

module.exports = admin_rotas