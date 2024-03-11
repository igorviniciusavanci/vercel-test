import City from './cityDTO'
import State from './stateDTO'

export default interface Address {
  address: string
  city: City
  city_id: string
  complement: string
  created_at: string
  id: string
  neighborhood: string
  number: number
  postal_code: string
  receiver_name: string
  seller_id: string
  state_id: number
  state: State
  updated_at: string
  user_id: string
}
