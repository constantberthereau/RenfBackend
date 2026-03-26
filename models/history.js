const { Model } = require('sequelize')

const History = (dbInstance, DataTypes) => {
  class History extends Model {
    static associate(models) {
      this.belongsTo(models.Request, {
        foreignKey: 'request_id',
        as: 'request'
      })
      this.belongsTo(models.Sinister, {
        foreignKey: 'sinister_id',
        as: 'sinister'
      })
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }

  History.init(
    {
      request_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sinister_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      update_details: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      sequelize: dbInstance,
      modelName: 'History',
      tableName: 'History',
      timestamps: false
    }
  )

  return History
}

module.exports = History
