'use strict'
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {
  async up(queryInterface) {
    const hashedpassword = await bcrypt.hash('MotDeP@ss123', parseInt(process.env.BCRYPT_SALT))
    await queryInterface.bulkInsert('User', [
      {
        id: 1,
        username: 'admin',
        email: 'admin@assurmoi.test',
        password: hashedpassword,
        firstname: 'Admin',
        lastname: 'AssurMoi',
        role: 'ADMIN',
        token: null,
        refresh_token: null,
        two_step_code: '111111',
        active: true,
      },
      {
        id: 2,
        username: 'gestionnaire',
        email: 'gestionnaire@assurmoi.test',
        password: hashedpassword,
        firstname: 'Gina',
        lastname: 'Gestionnaire',
        role: 'PORTFOLIO_MANAGER',
        token: null,
        refresh_token: null,
        two_step_code: '222222',
        active: true,
      },
      {
        id: 3,
        username: 'suivi',
        email: 'suivi@assurmoi.test',
        password: hashedpassword,
        firstname: 'Sam',
        lastname: 'Suivi',
        role: 'FOLLOW_UP_AGENT',
        token: null,
        refresh_token: null,
        two_step_code: '333333',
        active: true,
      },
      {
        id: 4,
        username: 'clientele',
        email: 'clientele@assurmoi.test',
        password: hashedpassword,
        firstname: 'Claire',
        lastname: 'Clientele',
        role: 'CUSTOMER_ADVISOR',
        token: null,
        refresh_token: null,
        two_step_code: '444444',
        active: true,
      }
    ], {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('User', {
      username: ['admin', 'gestionnaire', 'suivi', 'clientele']
    })
  }
}
