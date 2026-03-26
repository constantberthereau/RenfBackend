'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Document', [
      { id: 1, type: 'CNI_DRIVER', path: '/uploads/cni-driver.pdf', validated: true },
      { id: 2, type: 'VEHICLE_REGISTRATION_CERTIFICATE', path: '/uploads/carte-grise.pdf', validated: true },
      { id: 3, type: 'INSURANCE_CERTIFICATE', path: '/uploads/attestation-assurance.pdf', validated: false },
      { id: 4, type: 'DIAGNOSTIC_REPORT', path: '/uploads/rapport-expertise.pdf', validated: true },
      { id: 5, type: 'CONTRACTOR_INVOICE', path: '/uploads/facture-garagiste.pdf', validated: true },
      { id: 6, type: 'INSURED_RIB', path: '/uploads/rib-assure.pdf', validated: true }
    ], {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Document', {
      id: [1, 2, 3, 4, 5, 6]
    })
  }
}
