'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('User', [
      {
        id: 1,
        username: 'admin',
        email: 'admin@assurmoi.test',
        password: 'password',
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
        password: 'password',
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
        password: 'password',
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
        password: 'password',
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
