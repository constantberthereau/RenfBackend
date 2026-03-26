const { Model } = require('sequelize')

const Sinister = (dbInstance, DataTypes) => {
  class Sinister extends Model {
    static associate(models) {
      this.belongsTo(models.Document, {
        foreignKey: 'cni_driver',
        as: 'cniDriverDocument'
      })
      this.belongsTo(models.Document, {
        foreignKey: 'vehicule_registration_certificate',
        as: 'vehiculeRegistrationCertificateDocument'
      })
      this.belongsTo(models.Document, {
        foreignKey: 'insurance_certificate',
        as: 'insuranceCertificateDocument'
      })
      this.hasOne(models.Request, {
        foreignKey: 'sinister_id',
        as: 'request'
      })
      this.hasMany(models.History, {
        foreignKey: 'sinister_id',
        as: 'histories'
      })
    }
  }

  Sinister.init(
    {
      plate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driver_firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driver_lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driver_is_insured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      call_datetime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sinister_datetime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      context: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      driver_responsability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      driver_engaged_responsability: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      cni_driver: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      vehicule_registration_certificate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      insurance_certificate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      validated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    },
    {
      sequelize: dbInstance,
      modelName: 'Sinister',
      tableName: 'Sinister',
      timestamps: false
    }
  )

  return Sinister
}

module.exports = Sinister
