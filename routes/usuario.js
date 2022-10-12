const express = require('express')
const user_rotas = express.Router()
const Usuario = require('../models/usuario-model')
const Missao = require('../models/missao-model')



user_rotas.get('/', async(req, res) => {
    await Missao.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then((missoes) => {
        console.log(missoes.missao.dataValues.titulo)
        res.render('usuario/missoes', { missoes: missoes })
    })

})

user_rotas.get('/index', (req, res) => {
    res.render('user/index')
})


module.exports = user_rotas