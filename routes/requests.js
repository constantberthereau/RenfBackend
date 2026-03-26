const express = require('express')
const router = express.Router()
const { validateAuthentication } = require('../middlewares/auth')
const {
  getAllRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest
} = require('../services/requests')

router.post('/', validateAuthentication, createRequest)
router.get('/:id', validateAuthentication, getRequest)
router.get('/', validateAuthentication, getAllRequests)
router.delete('/:id', validateAuthentication, deleteRequest)
router.put('/:id', validateAuthentication, updateRequest)

module.exports = router
