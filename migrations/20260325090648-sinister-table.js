'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sinister', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      driver_firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      driver_lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      driver_is_insured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      call_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      sinister_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      context: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      driver_responsability: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      driver_engaged_responsability: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      cni_driver: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Document',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      vehicule_registration_certificate: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Document',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      insurance_certificate: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Document',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      validated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Sinister')
  }
}
