const { Op } = require('sequelize')
const { User, History, dbInstance } = require('../models')

const getAllUsers = async (req, res) => {
  const query = {}

  if (req.query?.search) {
    query.where = {
      [Op.or]: [
        { firstname: { [Op.like]: `%${req.query.search}%` } },
        { lastname: { [Op.like]: `%${req.query.search}%` } },
        { username: { [Op.like]: `%${req.query.search}%` } },
        { email: { [Op.like]: `%${req.query.search}%` } },
      ]
    }
  }

  const users = await User.findAll({
    ...query,
    include: [
      {
        model: History,
        as: 'histories',
      }
    ]
  })

  return res.status(200).json({ users })
}

const getUser = async (req, res) => {
  const id = req.params.id
  const user = await User.findOne({
    where: { id },
    include: [
      {
        model: History,
        as: 'histories',
      }
    ]
  })

  return res.status(200).json({ user })
}

const createUser = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      role,
      token,
      refresh_token,
      two_step_code,
      active
    } = req.body

    const user = await User.create({
      username,
      firstname,
      lastname,
      email,
      password,
      role,
      token,
      refresh_token,
      two_step_code,
      active
    }, { transaction })

    await transaction.commit()
    return res.status(201).json({ user })
  } catch (err) {
    await transaction.rollback()
    return res.status(400).json({
      message: 'Error on user creation',
      stacktrace: err.errors || err.message
    })
  }
}

const updateUser = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const user_id = req.params.id
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      role,
      token,
      refresh_token,
      two_step_code,
      active
    } = req.body

    const user = await User.update({
      username,
      firstname,
      lastname,
      email,
      password,
      role,
      token,
      refresh_token,
      two_step_code,
      active
    }, {
      where: { id: user_id },
      transaction
    })

    await transaction.commit()
    return res.status(200).json({
      message: 'Successfuly updated',
      user
    })
  } catch (err) {
    await transaction.rollback()
    return res.status(400).json({
      message: 'Error on user update',
      stacktrace: err.errors || err.message
    })
  }
}

const deleteUser = async (req, res) => {
  const transaction = await dbInstance.transaction()
  try {
    const user_id = req.params.id

    const status = await User.destroy({
      where: { id: user_id },
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
      message: 'Error on user deletion',
      stacktrace: err.errors || err.message
    })
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}
