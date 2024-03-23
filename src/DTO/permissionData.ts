import type FarmData from './farmDTO'
import type User from './userDTO'

export default interface PermissionData {
  active: boolean
  created_at: string
  farm_id: string
  farm: FarmData
  id: string
  owner_id: string
  p_farm: number
  p_manufacture: number
  p_patrimony_group: number
  p_patrimony_item: number
  p_permission: number
  p_user: number
  user: User
  user_id: string
}
