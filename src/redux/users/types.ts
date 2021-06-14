export interface User {
  isAdmin: boolean
  username: string
  name: string
  avatar: string | null
  id: string
  discriminator: string
  notificationsLevel: string
  latestUpdateNotifcation: string
  steamID: boolean
}

export interface UserState {
  loggedIn: boolean
  isAdmin: boolean
  loading: boolean

  user: User | null
}
