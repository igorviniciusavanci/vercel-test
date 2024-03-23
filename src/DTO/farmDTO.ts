import type FileData from './fileDTO'

export default interface FarmData {
  id: string
  name: string
  razao_social: string
  phone: string
  cnpj: string
  cpf: string
  file: FileData
}
