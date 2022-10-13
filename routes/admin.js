const express = require('express')
const admin_rotas = express.Router()
const Missao = require('../models/missao-model')
const Usuario = require('../models/usuario-model')
const Iniciomiss = require('../models/iniciomiss-model')

admin_rotas.get('/cadmissao', async(req, res) => {


    res.render('admin/cadastro-missao')


})

admin_rotas.post('/cadadd', (req, res) => {
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
        res.render('home/add_usuario', { erros: erros })
    } else {
        Missao.findOne({
            where: { titulo: titulo }
        }).then((missao) => {
            if (missao) {
                console.log(missao.titulo)
                res.render('home/cadastro', { error_msg: 'Já existe usuario com esse email!' })
            } else {
                Missao.create({
                    titulo: titulo,
                    tempo: tempo,
                    pontuacao: pontuacao,
                    descricao: descricao,
                    skill: skill
                }).then(() => {

                    res.render('home/login', { success_msg: 'Usuario adicionado com sucesso!' })
                }).catch((erro) => {
                    console.log('erro: ' + erro)
                    res.render('home/cadastro')
                })
            }
        }).catch((err) => {
            console.log('erro: ' + err)
            res.render('home/cadastro', { error_msg: 'erro interno na hora de cadastra user!' + err })
        })


    }
}

admin_rotas.get('/listaUsuarios', async(req, res) => {

    Usuario.findAll().then(function(usuarios) {
        res.render('admin/listaUsuarios', { usuarios: usuarios })
    })

})

admin_rotas.get('/pagUsuarios/:id', async(req, res) => {
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

/*
function missUser(res, usuario) {
    Missao.findAll({
        include: [{
            model: Iniciomiss,
            where: ['id = iduser'],
            include: [{
                model: Usuario,
                where: ['iduser = id']
            }]
        }]
    }).then(function(usuario) {
        console.log(usuario)
            //res.render('admin/pagUsuarios', { usuario: usuario, miss: miss })
    })
}
*/

admin_rotas.get('/pagAdmin', async(req, res) => {


    res.render('admin/pagAdmin')


})

module.exports = admin_rotas