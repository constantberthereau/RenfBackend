const { Op } = require('sequelize')
const { Sinister, Document, Request, History, dbInstance } = require('../models')

const sinisterIncludes = [
  { model: Document, as: 'cniDriverDocument' },
  { model: Document, as: 'vehiculeRegistrationCertificateDocument' },
  { model: Document, as: 'insuranceCertificateDocument' },
  { model: Request, as: 'request' },
  { model: History, as: 'histories' },
]

const getAllSinisters = async (req, res) => {
  const query = {}

  if (req.query?.search) {
    query.where = {
      [Op.or]: [
        { plate: { [Op.like]: `%${req.query.search}%` } },
        { driver_firstname: { [Op.like]: `%${req.query.search}%` } },
        { driver_lastname: { [Op.like]: `%${req.query.search}%` } },
      ]
    }
  }

  const sinisters = await Sinister.findAll({
    ...query,
    include: sinisterIncludes,
  })

  return res.status(200).json({ sinisters })
}

const getSinister = async (req, res) => {
  const sinister = await Sinister.findOne({
    where: { id: req.params.id },
    include: sinisterIncludes,
  })

  return res.status(200).json({ sinister })
}

const createSinister = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const sinister = await Sinister.create(req.body, { transaction })
    await transaction.commit()
    return res.status(201).json({ sinister })
  } catch (err) {
    await transaction.rollback()
    return res.status(400).json({
      message: 'Error on sinister creation',
      stacktrace: err.errors || err.message
    })
  }
}

const updateSinister = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const sinister = await Sinister.update(req.body, {
      where: { id: req.params.id },
      transaction
    })
    await transaction.commit()
    return res.status(200).json({
      message: 'Successfuly updated',
      sinister
    })
  } catch (err) {
    await transaction.rollback()
    return res.status(400).json({
      message: 'Error on sinister update',
      stacktrace: err.errors || err.message
    })
  }
}

const deleteSinister = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const status = await Sinister.destroy({
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
      message: 'Error on sinister deletion',
      stacktrace: err.errors || err.message
    })
  }
}

module.exports = {
  getAllSinisters,
  getSinister,
  createSinister,
  updateSinister,
  deleteSinister
}
