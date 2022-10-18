const db = require('./db')
const Usuario = require('../models/usuario-model')
const Tag = require('../models/tags-model')


const TagUser = db.sequelize.define('taguser', {})

TagUser.belongsTo(Usuario)
TagUser.belongsTo(Tag)

//TagUser.sync({ force: true })

module.exports = TagUser