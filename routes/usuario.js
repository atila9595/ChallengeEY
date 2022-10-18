const express = require('express')
const user_rotas = express.Router()
const Usuario = require('../models/usuario-model')
const Missao = require('../models/missao-model')
const Skills = require('../models/skills-model')
const Iniciomiss = require('../models/iniciomiss-model')
const Vaga = require('../models/vagas-model')
const TagsUser = require('../models/tagsUser-model')
const { eUser } = require('../helpers/eUser')
const { userOrAdmin } = require('../helpers/userOrAdmin')
const { Op } = require("sequelize");




user_rotas.get('/missoes', userOrAdmin, async(req, res) => {
    var id = req.user.id
    Iniciomiss.findAll({ where: { usuarioId: id } }).then((missusada) => {
        idmiss = JSON.stringify(missusada) //[2].missaoId)

        listmissfiltrada(res, missusada)
    })

})

function listmissfiltrada(res, missusada) {

    //console.log(missusada)


    Missao.findAll().then(function(miss) {
        res.render('usuario/missoes', { miss: miss, missusada: missusada })
    })
}

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

user_rotas.post('/progMissaoAtual/:id', eUser, (req, res) => {
    iduser = req.user.id
    idmiss = req.params.id
    certificado = req.body.certificado
    console.log('certificado========>', certificado)
    Iniciomiss.update({ statusmiss: 'concluido', validacaomiss: true, certificado: certificado }, { where: { missaoId: idmiss, usuarioId: iduser } }).then(() => {
        createSkills(idmiss, req, res)
    }).then(() => {
        res.redirect('/user/missoes')
    }).catch((erro) => {
        res.render('erro: ' + erro)
    })

})

async function createSkills(idmiss, req) {

    console.log('id da missão' + idmiss)
    await Skills.create({
        usuarioId: req.user.id,
        missaoId: idmiss
    })

    pesquisaMiss(idmiss, req)

}

async function pesquisaMiss(idmiss, req) {
    await Missao.findByPk(idmiss).then((miss) => {
        tagId = miss.tagId
        pontuacao = miss.pontuacao
        inserirPontoTag(tagId, pontuacao, req)

    }).catch((erro) => {
        console.log('erro: ' + erro)
    })
}

async function inserirPontoTag(tagId, pontuacao, req) {
    await TagsUser.create({
        usuarioId: req.user.id,
        tagId: tagId
    })

    var pontos = req.user.pontos + pontuacao
    var id = req.user.id
    await Usuario.update({
        pontos: pontos
    }, {
        where: {
            id: id
        }
    })






}

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

user_rotas.get('/listaVagas', eUser, (req, res) => {
    res.render('usuario/listaVagas')
})

user_rotas.get('/descVaga', eUser, (req, res) => {
    res.render('usuario/descVagas')
})

user_rotas.get('/vagaEnviada', eUser, (req, res) => {
    res.render('usuario/vagaEnviada')
})

user_rotas.get('/missoesAndamento', eUser, (req, res) => {
    res.render('usuario/missoesAndamento')
})

user_rotas.get('/listaVagas', eUser, (req, res) => {
    Vaga.findAll().then(function(vaga) {
        res.render('user/listaVagas', { vaga: vaga })
    })
})

user_rotas.get('/descVagas/:id', eUser, (req, res) => {
    var id = req.params.id
        //console.log(id)
    Vaga.findByPk(id).then((vaga) => {
        res.render('usuario/descVagas', { vaga: vaga })
    }).catch((erro) => {
        res.send('erro: ' + erro)
    })
})


module.exports = user_rotas