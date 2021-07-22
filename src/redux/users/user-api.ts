import axios from '../axios'
import { Webhook } from '../shared/interfaces'
import { User } from './types'

export async function getUserInfo() {
  const { data } = await axios.get<User>('/api/users')

  return data ?? null
}

export async function patchUser(data: Partial<User>) {
  return await axios.patch('/api/users', data)
}

export async function generateUserWebhook() {
  const { data } = await axios.post<Webhook>('/api/webhooks/v1/users')

  return data ?? null
}

export async function deleteWebhook() {
  return await axios.delete('/api/webhooks/v1/users')
}