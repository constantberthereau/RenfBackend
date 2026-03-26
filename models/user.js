const { Model } = require('sequelize')

const User = (dbInstance, DataTypes) => {
  class User extends Model {
    clean() {
      const { password, token, refresh_token, two_step_code, ...cleanedUser } = this.dataValues
      return cleanedUser
    }

    static associate(models) {
      this.hasMany(models.History, {
        foreignKey: 'user_id',
        as: 'histories'
      })
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('ADMIN', 'PORTFOLIO_MANAGER', 'FOLLOW_UP_AGENT', 'CUSTOMER_ADVISOR', 'INSURED'),
        allowNull: false,
        defaultValue: 'INSURED',
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      two_step_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    },
    {
      sequelize: dbInstance,
      modelName: 'User',
      tableName: 'User',
      timestamps: false
    }
  )

  return User;
}

module.exports = User
