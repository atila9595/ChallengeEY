const express = require('express')
const admin_rotas = express.Router()
const Missao = require('../models/missao-model')
const Usuario = require('../models/usuario-model')
const Iniciomiss = require('../models/iniciomiss-model')
const { eAdmin } = require('../helpers/eAdmin')

admin_rotas.get('/cadmissao', eAdmin, async(req, res) => {


    res.render('admin/cadastro-missao')


})

admin_rotas.post('/edtmissao/:id', async(req, res) => {
    miss = req.body
    var id = req.params.id
    var titulo = miss.titulo
    var descricao = miss.descricao
    var skill = miss.skill
    var pontuacao = miss.pontuacao
    console.log(miss, id)
    await Missao.update({
        titulo: titulo,
        pontuacao: pontuacao,
        descricao: descricao,
        skill: skill
    }, {
        where: {
            id: id
        }
    });

    res.redirect('/admin/pagAdmin')

})

admin_rotas.post('/cadadd', eAdmin, (req, res) => {
    var titulo = req.body.titulo
    var tempo = 12
    var pontuacao = req.body.ponto
    var descricao = req.body.descrição
    var skill = req.body.flexRadioDefault
    console.log(titulo, tempo, pontuacao, descricao, skill)
    saveMiss(res, titulo, tempo, pontuacao, descricao, skill)
})

function saveMiss(res, titulo, tempo, pontuacao, descricao, skill) {
    var erros = []

    if (!titulo || typeof titulo == undefined || titulo == null) {
        erros.push({ texto: 'titulo inválido' })
    }
    if (titulo.length < 2) {
        erros.push({ texto: 'titulo muito pequenos' })
    }
    if (!tempo || typeof tempo == undefined || tempo == null) {
        erros.push({ texto: 'tempo inválido' })
    }
    if (!pontuacao || typeof pontuacao == undefined || pontuacao == null) {
        erros.push({ texto: 'pontuacao inválido' })
    }

    if (!descricao || typeof descricao == undefined || descricao == null) {
        erros.push({ texto: 'descricao inválido' })
    }
    if (erros.length > 0) {
        res.render('admin/cadastro-missao', { erros: erros })
    } else {
        Missao.findOne({
            where: { titulo: titulo }
        }).then((missao) => {
            if (missao) {
                console.log(missao.titulo)
                res.render('admin/cadastro-missao', { error_msg: 'Já existe um nome com essa missão!' })
            } else {
                Missao.create({
                    titulo: titulo,
                    tempo: tempo,
                    pontuacao: pontuacao,
                    descricao: descricao,
                    skill: skill
                }).then(() => {

                    res.render('admin/pagAdmin', { success_msg: 'Missão criada com sucesso!' })
                }).catch((erro) => {
                    console.log('erro: ' + erro)
                    res.render('admin/cadastro-missao')
                })
            }
        }).catch((err) => {
            console.log('erro: ' + err)
            res.render('admin/cadastro-missao', { error_msg: 'erro interno na hora de cadastra user!' + err })
        })


    }
}

admin_rotas.get('/listaUsuarios', eAdmin, async(req, res) => {

    Usuario.findAll().then(function(usuarios) {
        res.render('admin/listaUsuarios', { usuarios: usuarios })
    })

})

admin_rotas.get('/pagUsuarios/:id', eAdmin, async(req, res) => {
    var id = req.params.id
    console.log(id)
    Usuario.findByPk(id).then((usuario) => {
            missUser(res, usuario)
                //res.render('admin/pagUsuarios', { usuario: usuario })
        }).catch((erro) => {
            res.send('erro: ' + erro)
        })
        //res.render('admin/pagUsuarios')
})

function missUser(res, usuario) {
    Iniciomiss.findAll({
        where: { usuarioId: usuario.id },
        include: [
            { model: Missao, attribute: ['titulo'] }, // load the profile picture.
            // Notice that the spelling must be the exact same as the one in the association
        ]
    }).then(function(miss) {
        //res.status(200).json(miss)
        res.render('admin/pagUsuarios', { usuario: usuario, miss: miss })
    })
}

admin_rotas.get('/pagAdmin', eAdmin, async(req, res) => {

    Missao.findAll().then(function(miss) {
        res.render('admin/pagAdmin', { miss: miss })
    })

})

admin_rotas.get('/editmissao/:id', eAdmin, async(req, res) => {
    var id = req.params.id
    Missao.findByPk(id).then((miss) => {

        res.render('admin/editar-missao', { miss: miss })
    }).catch((erro) => {
        res.send('erro: ' + erro)
    })

})

admin_rotas.get('/regras', eAdmin, (req, res) => {
    res.render('usuario/regras')
})

module.exports = admin_rotas