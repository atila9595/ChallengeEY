const express = require('express')
const user_rotas = express.Router()
const Usuario = require('../models/usuario-model')
const Missao = require('../models/missao-model')
const { json } = require('body-parser')



user_rotas.get('/missoes', async(req, res) => {

    res.render('usuario/missoes')

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


module.exports = user_rotas