export interface Profile {
  id: string
  username: string
  avatar: string
  pushcartPoints: number
  notificationsLevel: number
  lastUpdate: string
  steamId?: string
  roles: string[]
}

export interface UserState {
  loggedIn: boolean
  isAdmin: boolean
  loading: boolean

  updateUserErrorMsg: string

  user: Profile | null
}
