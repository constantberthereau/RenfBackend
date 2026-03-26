'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Sinister', [
      {
        id: 1,
        plate: 'AA-123-BB',
        driver_firstname: 'Jean',
        driver_lastname: 'Dupont',
        driver_is_insured: true,
        call_datetime: new Date('2026-03-25T08:30:00'),
        sinister_datetime: new Date('2026-03-25T07:45:00'),
        context: 'Collision arrière à un feu rouge.',
        driver_responsability: false,
        driver_engaged_responsability: 0,
        cni_driver: 1,
        vehicule_registration_certificate: 2,
        insurance_certificate: 3,
        validated: true,
      }
    ], {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Sinister', { id: [1] })
  }
}
