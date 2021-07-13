import axios from '../axios'
import { Webhook } from '../shared/interfaces'
import { ActiveServer, Server } from './types'

export async function getAllServers() {
  const { data } = await axios.get<Server[]>('/api/guilds')

  return data ?? null
}

export async function getServer(id: string) {
  const { data } = await axios.get<ActiveServer>(`/api/guilds/${id}`)

  return data ?? null
}

export async function patchServer(
  id: string,
  updatedData: Partial<ActiveServer>,
) {
  return await axios.patch(`/api/guilds/${id}`, updatedData)
}

export async function generateServerWebhook(
  guildId: string,
  channelId: string,
) {
  const { data } = await axios.post<Webhook>(
    `/api/webhooks/v1/guilds/${guildId}/create`,
    { channelId },
  )

  return data ?? null
}

export async function deleteServerWebhook(guildId: string) {
  return await axios.delete(`/api/webhooks/v1/guilds/${guildId}`)
}
