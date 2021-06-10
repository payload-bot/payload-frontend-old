import axios from '../axios'
import { User } from './types'

export async function getUserInfo() {
  const { data } = await axios.get<User>('/api/users')

  return data ?? null
}
