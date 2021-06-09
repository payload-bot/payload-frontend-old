import axios from 'axios'
import { User, UserGuilds } from './types'

export async function getUserInfo() {
  const { data } = await axios.get<User>('/api/users')

  return data ?? null
}

export async function getUserGuilds() {
  const { data } = await axios.get<UserGuilds[]>('/api/users/guilds')

  return data ?? null
}
