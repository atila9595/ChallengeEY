const db = require('./db')


const Tag = db.sequelize.define('tags', {
    titulo: {
        type: db.Sequelize.STRING
    }

})

//Tag.sync({ force: true })

module.exports = Tag