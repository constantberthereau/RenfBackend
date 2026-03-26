'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('User')

    const addColumnIfMissing = async (name, definition) => {
      if (!table[name]) {
        await queryInterface.addColumn('User', name, definition)
      }
    }

    await addColumnIfMissing('role', {
      type: Sequelize.ENUM('ADMIN', 'PORTFOLIO_MANAGER', 'FOLLOW_UP_AGENT', 'CUSTOMER_ADVISOR', 'INSURED'),
      allowNull: false,
      defaultValue: 'INSURED',
    })

    await addColumnIfMissing('token', {
      type: Sequelize.TEXT,
      allowNull: true,
    })

    await addColumnIfMissing('refresh_token', {
      type: Sequelize.TEXT,
      allowNull: true,
    })

    await addColumnIfMissing('two_step_code', {
      type: Sequelize.STRING,
      allowNull: true,
    })

    await addColumnIfMissing('active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    })

    try {
      await queryInterface.addConstraint('User', {
        fields: ['email'],
        type: 'unique',
        name: 'user_email_unique',
      })
    } catch (error) {}

    try {
      await queryInterface.addConstraint('User', {
        fields: ['username'],
        type: 'unique',
        name: 'user_username_unique',
      })
    } catch (error) {}
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable('User')

    const removeColumnIfExists = async (name) => {
      if (table[name]) {
        await queryInterface.removeColumn('User', name)
      }
    }

    try { await queryInterface.removeConstraint('User', 'user_email_unique') } catch (error) {}
    try { await queryInterface.removeConstraint('User', 'user_username_unique') } catch (error) {}

    await removeColumnIfExists('role')
    await removeColumnIfExists('token')
    await removeColumnIfExists('refresh_token')
    await removeColumnIfExists('two_step_code')
    await removeColumnIfExists('active')
  }
}
