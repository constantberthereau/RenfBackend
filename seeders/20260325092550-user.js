'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        username: 'CBT',
        password: 'password',
        firstname: 'Constant',
        lastname: 'Berthereau',
        email: 'a@a.com'
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', { username: 'saittirite' })
  }
};