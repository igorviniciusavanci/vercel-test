import type FarmData from './farmDTO'
import type NoteProblemDataItems from './noteProblemItemsDTO'
import type User from './userDTO'

export default interface NoteProblemData {
  id: string
  active?: boolean
  name: string
  user?: User
  user_id?: string
  farm_id?: string
  farm?: FarmData
  items?: NoteProblemDataItems[]
}
