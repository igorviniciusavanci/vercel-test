import type Address from './addressDTO'
import type BankAccount from './bankAccountDTO'

export default interface ProviderData {
  active: boolean
  cnpj: string
  created_at: string
  email: string
  id: string
  name: string
  razao_social: string
  phone: string
  whatsapp: string
  updated_at: string
  address: Address
  bank_account: BankAccount
}
