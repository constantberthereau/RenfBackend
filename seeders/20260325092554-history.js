'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('History', [
      {
        id: 1,
        request_id: 1,
        sinister_id: 1,
        user_id: 1,
        update_details: 'Création du sinistre et ouverture du dossier de prise en charge.',
        createdAt: new Date('2026-03-25T08:35:00')
      },
      {
        id: 2,
        request_id: 1,
        sinister_id: 1,
        user_id: 2,
        update_details: 'Validation des documents et planification de l’expertise.',
        createdAt: new Date('2026-03-26T10:00:00')
      }
    ], {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('History', { id: [1, 2] })
  }
}
