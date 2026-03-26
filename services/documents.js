const { Op } = require('sequelize')
const { Document, dbInstance } = require('../models')

const getAllDocuments = async (req, res) => {
  const query = {}

  if (req.query?.search) {
    query.where = {
      type: {
        [Op.like]: `%${req.query.search}%`
      }
    }
  }

  const documents = await Document.findAll(query)
  return res.status(200).json({ documents })
}

const getDocument = async (req, res) => {
  const document = await Document.findOne({
    where: { id: req.params.id }
  })

  return res.status(200).json({ document })
}

const createDocument = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const { type, path, validated } = req.body
    const document = await Document.create({ type, path, validated }, { transaction })
    await transaction.commit()

    return res.status(201).json({ document })
  } catch (err) {
    await transaction.rollback()
    return res.status(400).json({
      message: 'Error on document creation',
      stacktrace: err.errors || err.message
    })
  }
}

const updateDocument = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const { type, path, validated } = req.body
    const status = await Document.update({ type, path, validated }, {
      where: { id: req.params.id },
      transaction
    })
    await transaction.commit()

    return res.status(200).json({
      message: 'Successfuly updated',
      document: status
    })
  } catch (err) {
    await transaction.rollback()
    return res.status(400).json({
      message: 'Error on document update',
      stacktrace: err.errors || err.message
    })
  }
}

const deleteDocument = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const status = await Document.destroy({
      where: { id: req.params.id },
      transaction
    })
    await transaction.commit()

    return res.status(200).json({
      message: 'Successfuly deleted',
      status
    })
  } catch (err) {
    await transaction.rollback()
    return res.status(400).json({
      message: 'Error on document deletion',
      stacktrace: err.errors || err.message
    })
  }
}

module.exports = {
  getAllDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument
}
