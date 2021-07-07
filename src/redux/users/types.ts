export interface User {
  webhook: string | null;
  isAdmin: boolean
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
