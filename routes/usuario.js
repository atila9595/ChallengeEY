const express = require('express')
const user_rotas = express.Router()
const Usuario = require('../models/usuario-model')
const Missao = require('../models/missao-model')
const Skills = require('../models/skills-model')
const Iniciomiss = require('../models/iniciomiss-model')
const { eUser } = require('../helpers/eUser')
const { userOrAdmin } = require('../helpers/userOrAdmin')




user_rotas.get('/missoes', userOrAdmin, async(req, res) => {
    Missao.findAll().then(function(miss) {
        res.render('usuario/missoes', { miss: miss })
    })



})

user_rotas.get('/json_miss', eUser, async(req, res) => {

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


user_rotas.get('/index', eUser, (req, res) => {
    res.render('user/index')
})

user_rotas.get('/descMissao', eUser, (req, res) => {
    res.render('usuario/descMissao')
})

user_rotas.get('/progMissaoAtual/:id', eUser, (req, res) => {
    iduser = req.user.id
    Iniciomiss.update({ statusmiss: 'concluido', validacaomiss: true }, { where: { id: req.params.id, usuarioId: iduser } }).then(() => {
        res.redirect('usuario/missoes')
    })

})

user_rotas.get('/regras', eUser, (req, res) => {
    res.render('usuario/regras')
})


user_rotas.get('/descMissao/:id', eUser, (req, res) => {
    var id = req.params.id
        //console.log(id)
    Missao.findByPk(id).then((miss) => {
        res.render('usuario/descMissao', { miss: miss })
    }).catch((erro) => {
        res.send('erro: ' + erro)
    })
})

user_rotas.get('/progMissao/:id', eUser, (req, res) => {
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

user_rotas.get('/perfil/:id', eUser, (req, res) => {
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


user_rotas.get('/contato', eUser, (req, res) => {
    res.render('usuario/contatos')
})

module.exports = user_rotas