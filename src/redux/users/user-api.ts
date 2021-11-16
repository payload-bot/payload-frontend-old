import axios from '../axios'
import { Webhook } from '../shared/interfaces'
import { Profile } from './types'

export async function getUserInfo() {
  const { data } = await axios.get<Profile>('/api/v1/users')

  return data ?? null
}

export async function patchUser(data: Partial<Profile>) {
  return await axios.patch('/api/v1/users', data)
}

export async function generateUserWebhook() {
  const { data } = await axios.post<Webhook>('/api/v1/webhooks/users')

  return data ?? null
}

export async function deleteWebhook() {
  return await axios.delete('/api/v1/webhooks/users')
}