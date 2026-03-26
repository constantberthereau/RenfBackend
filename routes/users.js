const express = require('express')
const router = express.Router()
const { validateAuthentication } = require('../middlewares/auth')
const { validateUsername } = require('../middlewares/users')
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../services/users')

router.post('/', validateAuthentication, validateUsername, createUser)
router.get('/:id', validateAuthentication, getUser)
router.get('/', validateAuthentication, getAllUsers)
router.delete('/:id', validateAuthentication, deleteUser)
router.put('/:id', validateAuthentication, updateUser)

module.exports = router
