const userRoutes = require('./users')
const documentRoutes = require('./documents')
const sinisterRoutes = require('./sinisters')
const requestRoutes = require('./requests')
const historyRoutes = require('./histories')
const authRoutes = require('./auth')

function initRoutes(app) {
  app.use('/', authRoutes)
  app.use('/user', userRoutes)
  app.use('/document', documentRoutes)
  app.use('/sinister', sinisterRoutes)
  app.use('/request', requestRoutes)
  app.use('/history', historyRoutes)

  app.get('/', (req, res) => {
    res.status(200).json({
      message: "Bienvenu sur la route d'accueil"
    })
  })
}

module.exports = initRoutes
