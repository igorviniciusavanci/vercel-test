import FarmData from './farmDTO'
import PatrimonyData from './patrimonyDTO'
import User from './userDTO'

export default interface ChechInData {
  created_at: string
  farm_id: string
  farm: FarmData
  id: string
  final_date?: string
  initial_date: string
  patrimony_item_id: string
  patrimony_item: PatrimonyData
  updated_at: string
  user_id: string
  user: User
}
