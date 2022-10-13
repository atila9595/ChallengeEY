const db = require('./db')
const Usuario = require('./usuario-model')


const Skills = db.sequelize.define('skills', {

    react: {
        type: db.Sequelize.INTEGER
    },
    html: {
        type: db.Sequelize.INTEGER
    },
    css: {
        type: db.Sequelize.INTEGER
    },
    javascript: {
        type: db.Sequelize.INTEGER
    },
    bootstrap: {
        type: db.Sequelize.INTEGER
    },
    angular: {
        type: db.Sequelize.INTEGER
    },
    jquery: {
        type: db.Sequelize.INTEGER
    },
    lideranca: {
        type: db.Sequelize.INTEGER
    },
    comunicacao: {
        type: db.Sequelize.INTEGER
    },
    ingles: {
        type: db.Sequelize.INTEGER
    },
    trabalho_em_equipe: {
        type: db.Sequelize.INTEGER
    },
    flexibilidade: {
        type: db.Sequelize.INTEGER
    },
    espanhol: {
        type: db.Sequelize.INTEGER
    },
    criatividade: {
        type: db.Sequelize.INTEGER
    }

})

Skills.belongsTo(Usuario)

//Skills.sync({ force: true })

module.exports = Skills