const { Op } = require('sequelize')
const { Request, Sinister, Document, History, dbInstance } = require('../models')

const requestIncludes = [
  { model: Sinister, as: 'sinister' },
  { model: Document, as: 'diagnosticReportDocument' },
  { model: Document, as: 'case1ContractorInvoiceDocument' },
  { model: Document, as: 'case2InsuredRibDocument' },
  { model: History, as: 'histories' },
]

const getAllRequests = async (req, res) => {
  const query = {}

  if (req.query?.search) {
    query.where = {
      status: {
        [Op.like]: `%${req.query.search}%`
      }
    }
  }

  const requests = await Request.findAll({
    ...query,
    include: requestIncludes,
  })

  return res.status(200).json({ requests })
}

const getRequest = async (req, res) => {
  const request = await Request.findOne({
    where: { id: req.params.id },
    include: requestIncludes,
  })

  return res.status(200).json({ request })
}

const createRequest = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const request = await Request.create(req.body, { transaction })
    await transaction.commit()
    return res.status(201).json({ request })
  } catch (err) {
    await transaction.rollback()
    return res.status(400).json({
      message: 'Error on request creation',
      stacktrace: err.errors || err.message
    })
  }
}

const updateRequest = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const request = await Request.update(req.body, {
      where: { id: req.params.id },
      transaction
    })
    await transaction.commit()
    return res.status(200).json({
      message: 'Successfuly updated',
      request
    })
  } catch (err) {
    await transaction.rollback()
    return res.status(400).json({
      message: 'Error on request update',
      stacktrace: err.errors || err.message
    })
  }
}

const deleteRequest = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const status = await Request.destroy({
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
      message: 'Error on request deletion',
      stacktrace: err.errors || err.message
    })
  }
}

module.exports = {
  getAllRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest
}
