const db = require('./db')


const Usuario = db.sequelize.define('usuario', {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    },
    admin: {
        type: db.Sequelize.INTEGER
    },
    imguser: {
        type: db.Sequelize.TEXT
    },
    pontos: {
        type: db.Sequelize.INTEGER
    }

})

//Usuario.sync({ force: true })

module.exports = Usuario