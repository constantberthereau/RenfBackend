'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Request', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sinister_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Sinister',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM(
          'INITIALIZED',
          'EXPERTISE_PENDING',
          'EXPERTISE_PLANNED',
          'EXPERTISE_DONE',
          'CASE1_IN_PROGRESS',
          'CASE2_IN_PROGRESS',
          'CLOSED'
        ),
        allowNull: false,
        defaultValue: 'INITIALIZED',
      },
      expertise_plan_date: Sequelize.DATE,
      expertise_effective_date: Sequelize.DATE,
      expertise_report_recieved: Sequelize.DATE,
      diagnostic: {
        type: Sequelize.ENUM('REPAIRABLE', 'NON_REPAIRABLE'),
        allowNull: true,
      },
      diagnostic_report_file: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Document',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      case1_date_of_service_plan: Sequelize.DATE,
      case1_pickup_plan_date: Sequelize.DATE,
      case1_pickup_effective_date: Sequelize.DATE,
      case1_date_of_service_effective: Sequelize.DATE,
      case1_end_date_of_service: Sequelize.DATE,
      case1_return_date_plan: Sequelize.DATE,
      case1_return_date_effective: Sequelize.DATE,
      case1_contractor_invoice_date: Sequelize.DATE,
      case1_contractor_invoice: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Document',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      case1_date_contractor_invoice_paid: Sequelize.DATE,
      case1_third_party_invoice_paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      case2_estimated_compensation: Sequelize.FLOAT,
      case2_approved_compensation: Sequelize.BOOLEAN,
      case2_pickup_plan_date: Sequelize.DATE,
      case2_insured_rib: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Document',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      case2_pickup_effective_date: Sequelize.DATE,
      case2_compensation_payment_date: Sequelize.DATE,
      case2_third_party_invoice_paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      closed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Request')
  }
}
