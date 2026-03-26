const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const { User, History, dbInstance } = require('../models')
require('dotenv').config()

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

  return res.status(200).json({ users: users.map(user => user.clean ? user.clean() : user) })
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

  return res.status(200).json({ user: user?.clean ? user.clean() : user })
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

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT || '10', 10))

    const user = await User.create({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
      token,
      refresh_token,
      two_step_code,
      active
    }, { transaction })

    await transaction.commit()
    return res.status(201).json({ user: user.clean() })
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

    const payload = {
      username,
      firstname,
      lastname,
      email,
      role,
      token,
      refresh_token,
      two_step_code,
      active
    }

    if (password) {
      payload.password = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT || '10', 10))
    }

    const user = await User.update(payload, {
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
