const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const db = {}

const { Sequelize } = require('sequelize')
require('dotenv').config()

const dialectOptions = process.env.NODE_ENV === 'production'
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  : {}

const dbInstance = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    logging: false,
    dialectOptions,
  }
)

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    )
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(dbInstance, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

module.exports = {
  dbInstance,
  ...db
}
