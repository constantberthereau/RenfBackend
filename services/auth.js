const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({
      where: { username }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    let isPasswordValid = false

    if (typeof user.password === 'string' && user.password.startsWith('$2')) {
      isPasswordValid = await bcrypt.compare(password, user.password)
    } else {
      isPasswordValid = password === user.password
    }

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    const token = jwt.sign({ user: user.clean() }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    })

    user.token = token
    await user.save()

    return res.status(200).json({
      token,
      user: user.clean(),
    })
  } catch (err) {
    return res.status(400).json({
      message: 'error on login',
      stacktrace: err.message,
    })
  }
}

const logout = async (req, res) => {
  req.user.token = null
  await req.user.save()

  return res.status(200).json({ message: 'unlogged !' })
}

module.exports = {
  login,
  logout,
}
