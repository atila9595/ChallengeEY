const db = require('./db')
const Usuario = require('./usuario-model')
const Missao = require('./missao-model')


const Iniciomiss = db.sequelize.define('iniciomissao', {

    statusmiss: {
        type: db.Sequelize.STRING
    },
    validacaomiss: {
        type: db.Sequelize.BOOLEAN
    },
    certificado: {
        type: db.Sequelize.STRING
    }

})

Iniciomiss.belongsTo(Usuario)
Iniciomiss.belongsTo(Missao)

//Iniciomiss.sync({ force: true })

module.exports = Iniciomiss