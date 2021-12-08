import axios from '../axios'
import { Webhook } from '../shared/interfaces'
import { ActiveServer, Server, UpdateServerDto } from './types'

export async function getAllServers() {
  const { data } = await axios.get<Server[]>('/api/v1/guilds')

  return data ?? null
}

export async function getServer(id: string) {
  const { data } = await axios.get<ActiveServer>(`/api/v1/guilds/${id}`)

  return data ?? null
}

export async function patchServer(
  id: string,
  updatedData: Partial<UpdateServerDto>,
) {
  return await axios.patch(`/api/v1/guilds/${id}`, updatedData)
}

export async function generateServerWebhook(
  guildId: string,
  channelId: string,
) {
  const { data } = await axios.post<Webhook>(
    `/api/v1/webhooks/guilds/${guildId}`,
    { channelId },
  )

  return data ?? null
}

export async function deleteServerWebhook(guildId: string) {
  return await axios.delete(`/api/v1/webhooks/guilds/${guildId}`)
}
