//carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
    //const cors = require('cors')
const app = express()
const user = require('./routes/usuario')
const login = require('./routes/login')
    //rotas
const path = require('path')
    //const session = require('express-session')
    //const flash = require('connect-flash')
    //const passport = require('passport')
    //require('./config/auth')(passport)

//Configuração

//sessão
//app.use(session({secret: 'apptroca',resave: true,saveUninitialized: true}))
//app.use(passport.initialize())
//app.use(passport.session())
//app.use(flash())

//middleware
/*
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    next()
})
*/
//cors
//app.use(cors())
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'));

//mongoose
// em breve

//public
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

//Rotas
app.use('/user', user)
app.use('/', login)

//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor rodando! ')
})