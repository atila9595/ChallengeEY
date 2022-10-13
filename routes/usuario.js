const express = require('express')
const user_rotas = express.Router()
const Usuario = require('../models/usuario-model')
const Missao = require('../models/missao-model')




user_rotas.get('/missoes', async(req, res) => {
    Missao.findAll().then(function(miss) {
        res.render('usuario/missoes', { miss: miss })
    })



})

user_rotas.get('/json_miss', async(req, res) => {

    await Missao.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then((missoeslist) => {

        res.status(200).json(missoeslist)
    }).catch((error) => {
        res.render('usuario/missoes')
    })

})


user_rotas.get('/index', (req, res) => {
    res.render('user/index')
})

user_rotas.get('/descMissao', (req, res) => {
    res.render('usuario/descMissao')
})

user_rotas.get('/progMissao', (req, res) => {
    res.render('usuario/progMissao')
})

user_rotas.get('/regras', (req, res) => {
    res.render('usuario/regras')
})


module.exports = user_rotas