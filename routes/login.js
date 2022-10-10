const express = require('express')
const login_rotas = express.Router()

login_rotas.get('', async(req, res) => {

    res.send('login é aqui!')
        //res.render('home/loginPage')


})

login_rotas.get('/cadastro', async(req, res) => {

    res.send('cadastro é aqui!')
        //res.render('home/loginPage')


})

module.exports = login_rotas