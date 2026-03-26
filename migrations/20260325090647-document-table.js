'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Document', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM(
          'CNI_DRIVER',
          'VEHICLE_REGISTRATION_CERTIFICATE',
          'INSURANCE_CERTIFICATE',
          'DIAGNOSTIC_REPORT',
          'CONTRACTOR_INVOICE',
          'INSURED_RIB',
          'OTHER'
        ),
        allowNull: false,
      },
      path: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      validated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Document')
  }
}
