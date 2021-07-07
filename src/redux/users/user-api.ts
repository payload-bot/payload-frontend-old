import axios from '../axios'
import { User } from './types'

export async function getUserInfo() {
  const { data } = await axios.get<User>('/api/users')

  return data ?? null
}

export async function patchUser(data: Partial<User>) {
  return await axios.patch('/api/users', data)
}

export async function generateUserWebhook() {
  const { data } = await axios.post<{ data: string }>('/api/webhooks/v1/users/create')

  return data ?? null
}

export async function deleteWebhook() {
  return await axios.delete('/api/webhooks/v1/users')
}