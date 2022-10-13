const express = require('express')
const user_rotas = express.Router()
const Usuario = require('../models/usuario-model')
const Missao = require('../models/missao-model')
const Skills = require('../models/skills-model')
const Iniciomiss = require('../models/iniciomiss-model')




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


user_rotas.get('/descMissao/:id', (req, res) => {
    var id = req.params.id
        //console.log(id)
    Missao.findByPk(id).then((miss) => {
        res.render('usuario/descMissao', { miss: miss })
    }).catch((erro) => {
        res.send('erro: ' + erro)
    })
})

user_rotas.get('/progMissao/:id', (req, res) => {
    var idmiss = req.params.id
    console.log(idmiss)

    Iniciomiss.create({
        usuarioId: req.user.id,
        missaoId: idmiss,
        statusmiss: 'pendente',
        validacaomiss: false
    }).then(() => {
        getIdMiss(idmiss, res)
    }).catch((erro) => {
        res.send('erro: ' + erro)
    })
})

user_rotas.get('/perfil/:id', (req, res) => {
    var id = req.user.id
    console.log(id)
    Skills.findByPk(id).then((skill) => {
        res.render('usuario/perfil', { skill: skill })
    }).catch((erro) => {
        res.send('erro: ' + erro)
    })
})

function getIdMiss(id, res) {
    Missao.findByPk(id).then((miss) => {
        res.render('usuario/progMissao', { miss: miss })
    }).catch((erro) => {
        res.send('erro: ' + erro)
    })
}

module.exports = user_rotas