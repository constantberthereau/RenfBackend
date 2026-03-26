const userRoutes = require('./users')
const documentRoutes = require('./documents')
const sinisterRoutes = require('./sinisters')
const requestRoutes = require('./requests')
const historyRoutes = require('./histories')

function initRoutes(app) {
  app.use('/user', userRoutes)
  app.use('/document', documentRoutes)
  app.use('/sinister', sinisterRoutes)
  app.use('/request', requestRoutes)
  app.use('/history', historyRoutes)

  app.get('/', (req, res, next) => {
    console.log('middleware 1 homepage')
    next()
  }, (req, res) => {
    console.log('Controller homepage')
    res.status(200).json({
      message: "Bienvenu sur la route d'accueil"
    })
  })
}

module.exports = initRoutes
