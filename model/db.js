const Sequelize = require('sequelize')

// Cofiguração 
//mysql
const sequelize = new Sequelize('challengeey', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log('conectado com sucesso!')
}).catch((erro) => {
    console.log('falha ao se conectar! ' + erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}