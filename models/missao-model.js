const db = require('./db')


const Missao = db.sequelize.define('missao', {
    titulo: {
        type: db.Sequelize.STRING
    },
    tempo: {
        type: db.Sequelize.STRING
    },
    pontuacao: {
        type: db.Sequelize.INTEGER
    },
    descricao: {
        type: db.Sequelize.TEXT
    },
    skill: {
        type: db.Sequelize.STRING
    }

})

//Missao.sync({ force: true })

module.exports = Missao