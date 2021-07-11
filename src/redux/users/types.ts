import { Webhook } from "../shared/interfaces";

export interface User {
  isAdmin: boolean
  isBetaTester: boolean
  webhook: Webhook
  username: string
  name: string
  avatar: string | null
  id: string
  discriminator: string
  notificationsLevel: string
  latestUpdateNotifcation: string
  steamId: boolean
}

export interface UserState {
  loggedIn: boolean
  isAdmin: boolean
  loading: boolean

  updateUserErrorMsg: string

  user: User | null
}
