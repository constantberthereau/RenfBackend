const express = require('express')
const router = express.Router()
const { validateAuthentication } = require('../middlewares/auth')
const {
  getAllHistories,
  getHistory,
  createHistory,
  updateHistory,
  deleteHistory
} = require('../services/histories')

router.post('/', validateAuthentication, createHistory)
router.get('/:id', validateAuthentication, getHistory)
router.get('/', validateAuthentication, getAllHistories)
router.delete('/:id', validateAuthentication, deleteHistory)
router.put('/:id', validateAuthentication, updateHistory)

module.exports = router
