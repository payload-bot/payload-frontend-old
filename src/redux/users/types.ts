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

export interface UserGuilds {
  iconUrl: string
  isPayloadIn: boolean
  id: string
  name: string
  icon: string
  owner: boolean
  permissions: number
  permissions_new: number
}

export interface UserState {
  loggedIn: boolean
  isAdmin: boolean
  loading: boolean
  guilds: UserGuilds[]

  user: User | null
}
