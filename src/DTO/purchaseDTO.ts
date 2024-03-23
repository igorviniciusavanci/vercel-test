import type File from './fileDTO'
import type ProviderData from './providerDTO'

export default interface PurchaseData {
  active: boolean
  company: ProviderData
  company_id: string
  cost_center: string
  created_at: string
  file: File
  id: string
  nota_fiscal: string
  purchase_date: string
  purchase_number: string
  status: string
  updated_at: string
  note: string
  files: File[]
}
