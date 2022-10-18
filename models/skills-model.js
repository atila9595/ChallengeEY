const db = require('./db')
const Usuario = require('./usuario-model')
const Missao = require('../models/missao-model')


const Skills = db.sequelize.define('skills', {})

Skills.belongsTo(Usuario)
Skills.belongsTo(Missao)

//Skills.sync({ force: true })

module.exports = Skills