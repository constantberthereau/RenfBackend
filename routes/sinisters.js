const express = require('express')
const router = express.Router()
const { validateAuthentication } = require('../middlewares/auth')
const {
  getAllSinisters,
  getSinister,
  createSinister,
  updateSinister,
  deleteSinister
} = require('../services/sinisters')

router.post('/', validateAuthentication, createSinister)
router.get('/:id', validateAuthentication, getSinister)
router.get('/', validateAuthentication, getAllSinisters)
router.delete('/:id', validateAuthentication, deleteSinister)
router.put('/:id', validateAuthentication, updateSinister)

module.exports = router
