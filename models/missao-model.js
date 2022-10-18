const db = require('./db')
const Tag = require('../models/tags-model')

const Missao = db.sequelize.define('missao', {
    titulo: {
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
    },
    url: {
        type: db.Sequelize.STRING
    }

})

Missao.belongsTo(Tag)

//Missao.sync({ force: true })

module.exports = Missao