import type FarmData from './farmDTO'
import type FileData from './fileDTO'
import type manufacturerData from './manufacturerDTO'
import type PatrimonyGroupData from './patrimonyGroupDTO'

export default interface PatrimonyData {
  id: string
  name: string
  owner_id: string
  description: string
  color: string
  patrimony_code: string
  acquisition_date: string
  manufacturing_date: string
  farm_id: string
  farm: FarmData
  model: string
  motor_number: string
  serial_number: string
  chassi_number: string
  fuel: string
  nfe_number: string
  note: string
  minimum_power: string
  maximum_power: string
  patrimony_group_id: string
  patrimonyGroup: PatrimonyGroupData
  manufacturer_id: string
  manufacturer: manufacturerData
  value: string
  files: FileData[]
}
