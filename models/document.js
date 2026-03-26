const { Model } = require('sequelize')

const Document = (dbInstance, DataTypes) => {
  class Document extends Model {
    static associate(models) {
      this.hasMany(models.Sinister, {
        foreignKey: 'cni_driver',
        as: 'sinistersAsCniDriver'
      })
      this.hasMany(models.Sinister, {
        foreignKey: 'vehicule_registration_certificate',
        as: 'sinistersAsVehiculeRegistrationCertificate'
      })
      this.hasMany(models.Sinister, {
        foreignKey: 'insurance_certificate',
        as: 'sinistersAsInsuranceCertificate'
      })
      this.hasMany(models.Request, {
        foreignKey: 'diagnostic_report_file',
        as: 'requestsAsDiagnosticReport'
      })
      this.hasMany(models.Request, {
        foreignKey: 'case1_contractor_invoice',
        as: 'requestsAsContractorInvoice'
      })
      this.hasMany(models.Request, {
        foreignKey: 'case2_insured_rib',
        as: 'requestsAsInsuredRib'
      })
    }
  }

  Document.init(
    {
      type: {
        type: DataTypes.ENUM(
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
        type: DataTypes.TEXT,
        allowNull: false,
      },
      validated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    },
    {
      sequelize: dbInstance,
      modelName: 'Document',
      tableName: 'Document',
      timestamps: false
    }
  )

  return Document
}

module.exports = Document
