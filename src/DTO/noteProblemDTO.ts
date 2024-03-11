import FarmData from './farmDTO'
import NoteProblemDataItems from './noteProblemItemsDTO'
import User from './userDTO'

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
