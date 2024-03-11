export default interface BankAccount {
  id: string
  bank_name: string
  bank_code: string
  agency: string
  agency_dv: string
  account: string
  account_dv: string
  account_owner: string
  operation: string
  type: string
  document_type: string
  document_number: string
  legal_name: string
  external_id: string
  active: boolean
  created_at: Date
  updated_at: Date
  pix: string
  pix_type: string
  tax_number: string
}
