import File from './fileDTO'

export default interface User {
  active: boolean
  birthday: string
  cpf: string
  cnpj: string
  created_at: string
  disc: string
  email: string
  external_id: string
  files: File[]
  following: string
  gender: string
  id: string
  name: string
  skill: string[]
  phone: string
  updated_at: string
  verified: boolean
}
