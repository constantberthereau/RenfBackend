const express = require('express')
const router = express.Router()
const {
  getAllHistories,
  getHistory,
  createHistory,
  updateHistory,
  deleteHistory
} = require('../services/histories')

router.post('/', createHistory)
router.get('/:id', getHistory)
router.get('/', getAllHistories)
router.delete('/:id', deleteHistory)
router.put('/:id', updateHistory)

module.exports = router
