const { Op } = require('sequelize')
const { History, Request, Sinister, User, dbInstance } = require('../models')

const historyIncludes = [
  { model: Request, as: 'request' },
  { model: Sinister, as: 'sinister' },
  { model: User, as: 'user' },
]

const getAllHistories = async (req, res) => {
  const query = {}

  if (req.query?.search) {
    query.where = {
      update_details: {
        [Op.like]: `%${req.query.search}%`
      }
    }
  }

  const histories = await History.findAll({
    ...query,
    include: historyIncludes,
  })

  return res.status(200).json({ histories })
}

const getHistory = async (req, res) => {
  const history = await History.findOne({
    where: { id: req.params.id },
    include: historyIncludes,
  })

  return res.status(200).json({ history })
}

const createHistory = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const history = await History.create(req.body, { transaction })
    await transaction.commit()
    return res.status(201).json({ history })
  } catch (err) {
    await transaction.rollback()
    return res.status(400).json({
      message: 'Error on history creation',
      stacktrace: err.errors || err.message
    })
  }
}

const updateHistory = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const history = await History.update(req.body, {
      where: { id: req.params.id },
      transaction
    })
    await transaction.commit()
    return res.status(200).json({
      message: 'Successfuly updated',
      history
    })
  } catch (err) {
    await transaction.rollback()
    return res.status(400).json({
      message: 'Error on history update',
      stacktrace: err.errors || err.message
    })
  }
}

const deleteHistory = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const status = await History.destroy({
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
      message: 'Error on history deletion',
      stacktrace: err.errors || err.message
    })
  }
}

module.exports = {
  getAllHistories,
  getHistory,
  createHistory,
  updateHistory,
  deleteHistory
}
