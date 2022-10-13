const express = require('express')
const login_rotas = express.Router()
const Usuario = require('../models/usuario-model')
const Skills = require('../models/skills-model')
const passport = require("passport")
var bcrypy = require('bcryptjs');
const { lougado } = require('../helpers/lougado')

const adminList = [
    "cdecastrohenriques@gmail.com",
    "teste1@gmail.com",
    "age@fiap.com.br"
    ]


login_rotas.get('', lougado, async(req, res) => {


    res.render('home/login')


})

login_rotas.get('/cadastro', lougado, async(req, res) => {


    res.render('home/cadastro')


})

login_rotas.post('/add', (req, res) => {

    var nome = req.body.name
    var email = req.body.email
    var password = req.body.password
    if(adminList.includes(email)) {
        var  admin = 1
    } else { 
        var admin = 0
    }
    var imguser = req.body.nomediv
    var pontos = 0
        //console.log(nome, email, password, admin, imguser)
    saveUser(res, nome, email, password, admin, imguser, pontos)
})

function saveUser(res, nomeuse, emailuse, passworduse, adminuse, imguser, pontos) {
    var erros = []

    if (!nomeuse || typeof nomeuse == undefined || nomeuse == null) {
        erros.push({ texto: 'Nome inválido' })
    }
    if (nomeuse.length < 2) {
        erros.push({ texto: 'Nome do produto muito pequenos' })
    }
    if (!emailuse || typeof emailuse == undefined || emailuse == null) {
        erros.push({ texto: 'email inválido' })
    }
    if (!passworduse || typeof passworduse == undefined || passworduse == null) {
        erros.push({ texto: 'password inválido' })
    }
    if (passworduse.length < 2) {
        erros.push({ texto: 'password do user muito pequenos' })
    }
    if (!imguser || typeof imguser == undefined || imguser == null) {
        erros.push({ texto: 'Imagem inválido' })
    }
    if (erros.length > 0) {
        res.render('home/add_usuario', { erros: erros })
    } else {
        Usuario.findOne({
            where: { email: emailuse }
        }).then((usuario) => {
            if (usuario) {
                console.log(usuario.email)
                res.render('home/cadastro', { error_msg: 'Já existe usuario com esse email!' })
            } else {
                bcrypy.genSalt(10, (erro, salt) => {
                    bcrypy.hash(passworduse, salt, (erro, hash) => {
                        if (erro) {
                            res.render('home/cadastro', { error_msg: 'Houve um erro durante o salvamento do usuario!' })
                        }

                        passworduse = hash

                        createSkills()

                        Usuario.create({
                            nome: nomeuse,
                            email: emailuse,
                            password: passworduse,
                            admin: adminuse,
                            imguser: imguser,
                            pontos: pontos
                        }).then(() => {

                            res.render('home/login', { success_msg: 'Usuario adicionado com sucesso!' })
                        }).catch((erro) => {
                            console.log('erro: ' + erro)
                            res.render('home/cadastro')
                        })

                    })
                })
            }
        }).catch((err) => {
            res.render('home/cadastro', { error_msg: 'erro interno na hora de cadastra user!' + err })
        })


    }
}

function createSkills() {

    Skills.create({
        react: 0,
        html: 0,
        css: 0,
        javascript: 0,
        bootstrap: 0,
        angular: 0,
        jquery: 0,
        lideranca: 0,
        comunicacao: 0,
        ingles: 0,
        trabalho_em_equipe: 0,
        flexibilidade: 0,
        espanhol: 0,
        criatividade: 0
    })

}

login_rotas.post('/loginAuth', (req, res, next) => {

    passport.authenticate("local", {
        successRedirect: "/user/missoes",
        failureRedirect: "/home/login",
        failureFlash: true
    })(req, res, next)

})



login_rotas.get("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        res.redirect("/home");
    });
});

module.exports = login_rotas