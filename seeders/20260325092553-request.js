'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Request', [
      {
        id: 1,
        sinister_id: 1,
        status: 'EXPERTISE_DONE',
        expertise_plan_date: new Date('2026-03-26T09:00:00'),
        expertise_effective_date: new Date('2026-03-27T10:00:00'),
        expertise_report_recieved: new Date('2026-03-28T14:00:00'),
        diagnostic: 'REPAIRABLE',
        diagnostic_report_file: 4,
        case1_date_of_service_plan: new Date('2026-03-29T09:00:00'),
        case1_pickup_plan_date: new Date('2026-03-29T15:00:00'),
        case1_pickup_effective_date: null,
        case1_date_of_service_effective: null,
        case1_end_date_of_service: null,
        case1_return_date_plan: null,
        case1_return_date_effective: null,
        case1_contractor_invoice_date: null,
        case1_contractor_invoice: 5,
        case1_date_contractor_invoice_paid: null,
        case1_third_party_invoice_paid: false,
        case2_estimated_compensation: null,
        case2_approved_compensation: null,
        case2_pickup_plan_date: null,
        case2_insured_rib: 6,
        case2_pickup_effective_date: null,
        case2_compensation_payment_date: null,
        case2_third_party_invoice_paid: false,
        closed: false,
      }
    ], {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Request', { id: [1] })
  }
}
