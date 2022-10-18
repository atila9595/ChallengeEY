const db = require('./db')
const Tag = require('../models/tags-model')


const Vaga = db.sequelize.define('vaga', {
    titulo: {
        type: db.Sequelize.STRING
    },
    descricao: {
        type: db.Sequelize.TEXT
    },
    horas: {
        type: db.Sequelize.STRING
    }

})

Vaga.belongsTo(Tag)

//Vaga.sync({ force: true })

module.exports = Vaga