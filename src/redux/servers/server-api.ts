import axios from '../axios'
import { ActiveServer, Server } from './types'

export async function getAllServers() {
  const { data } = await axios.get<Server[]>('/api/guilds')

  return data ?? null
}

export async function getServer(id: string) {
  const { data } = await axios.get<ActiveServer>(`/api/guilds/${id}`)

  return data ?? null
}
