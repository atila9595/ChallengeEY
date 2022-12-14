const express = require('express')
const admin_rotas = express.Router()
const Missao = require('../models/missao-model')
const Vaga = require('../models/vagas-model')
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
    var url = req.body.url
    var categoria = req.body.categoria
    var pontuacao = req.body.ponto
    var descricao = req.body.descrição
    var skill = req.body.flexRadioDefault
    console.log(titulo, url, categoria, pontuacao, descricao, skill)
    saveMiss(res, req, titulo, url, categoria, pontuacao, descricao, skill)
})

function saveMiss(res, req, titulo, url, categoria, pontuacao, descricao, skill) {
    var erros = []

    if (!titulo || typeof titulo == undefined || titulo == null) {
        erros.push({ texto: 'titulo inválido' })
    }
    if (titulo.length < 2) {
        erros.push({ texto: 'titulo muito pequenos' })
    }
    if (!url || typeof url == undefined || url == null) {
        erros.push({ texto: 'url inválido' })
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
                    pontuacao: pontuacao,
                    descricao: descricao,
                    skill: skill,
                    url: url,
                    tagId: categoria
                }).then(() => {

                    //res.render('admin/pagAdmin', { success_msg: 'Missão criada com sucesso!' })
                    req.flash({ success_msg: 'Missão criada com sucesso!' })
                    res.redirect("/admin/pagAdmin");
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

admin_rotas.get('/vagas', eAdmin, (req, res) => {
    Vaga.findAll().then(function(vaga) {
        res.render('admin/vagasHome', { vaga: vaga })
    })
})

admin_rotas.get('/cadastroVagas', eAdmin, (req, res) => {
    res.render('admin/cadastro-vagas')
})

admin_rotas.get('/descVagas', eAdmin, (req, res) => {
    res.render('usuario/descVagas')
})



admin_rotas.post('/cadvagas', eAdmin, (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descrição
    var categoria = req.body.categoria
    var horas = 6
    console.log(titulo, descricao, categoria, horas)
    saveMissVagas(res, req, titulo, descricao, categoria, horas)
})

function saveMissVagas(res, req, titulo, descricao, categoria, horas) {
    var erros = []

    if (!titulo || typeof titulo == undefined || titulo == null) {
        erros.push({ texto: 'titulo inválido' })
    }
    if (titulo.length < 2) {
        erros.push({ texto: 'titulo muito pequenos' })
    }
    if (!descricao || typeof descricao == undefined || descricao == null) {
        erros.push({ texto: 'descricao inválido' })
    }
    if (erros.length > 0) {
        res.render('admin/cadastro-vagas', { erros: erros })
    } else {
        Vaga.findOne({
            where: { titulo: titulo }
        }).then((vaga) => {
            if (vaga) {
                console.log(vaga.titulo)
                res.render('admin/cadastro-vagas', { error_msg: 'Já existe um nome com essa vaga!' })
            } else {
                Vaga.create({
                    titulo: titulo,
                    descricao: descricao,
                    horas: horas,
                    tagId: categoria
                }).then(() => {

                    //res.render('admin/pagAdmin', { success_msg: 'Vaga criada com sucesso!' })
                    req.flash({ success_msg: 'Vaga criada com sucesso!' })
                    res.redirect("/admin/vagas");
                }).catch((erro) => {
                    console.log('erro: ' + erro)
                    res.render('admin/cadastro-vagas')
                })
            }
        }).catch((err) => {
            console.log('erro: ' + err)
            res.render('admin/cadastro-vagas', { error_msg: 'erro interno na hora de cadastra user!' + err })
        })


    }
}

admin_rotas.get('/descVagas/:id', eAdmin, (req, res) => {
    var id = req.params.id
        //console.log(id)
    Vaga.findByPk(id).then((vaga) => {
        res.render('usuario/descVagas', { vaga: vaga })
    }).catch((erro) => {
        res.send('erro: ' + erro)
    })
})

module.exports = admin_rotas