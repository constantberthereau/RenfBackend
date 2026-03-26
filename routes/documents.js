const express = require('express')
const router = express.Router()
const { validateAuthentication } = require('../middlewares/auth')
const {
  getAllDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument
} = require('../services/documents')

router.post('/', validateAuthentication, createDocument)
router.get('/:id', validateAuthentication, getDocument)
router.get('/', validateAuthentication, getAllDocuments)
router.delete('/:id', validateAuthentication, deleteDocument)
router.put('/:id', validateAuthentication, updateDocument)

module.exports = router
