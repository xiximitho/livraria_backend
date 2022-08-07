const { Sequelize } = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: 'mysql',
    port: config.port
  },
  config.define
)

module.exports = sequelize
