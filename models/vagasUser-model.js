const db = require('./db')
const Usuario = require('../models/usuario-model')
const Vaga = require('../models/vagas-model')


const VagasUser = db.sequelize.define('vagasuser', {})

VagasUser.belongsTo(Usuario)
VagasUser.belongsTo(Vaga)

//VagasUser.sync({ force: true })

module.exports = VagasUser