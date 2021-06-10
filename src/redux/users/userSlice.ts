import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { User, UserGuilds, UserState } from './types'
import { getUserGuilds, getUserInfo } from './user-api'

const initialState: UserState = {
  loading: true,
  isAdmin: false,
  loggedIn: false,
  guilds: [],
  user: null,
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserSuccess: (state, { payload }: PayloadAction<User>) => {
      state.isAdmin = payload.isAdmin
      state.loading = false
      state.loggedIn = true
      state.user = payload
    },

    setUserFailure: state => {
      state.loading = false
      state.loggedIn = false
      state.user = null
    },

    setUserGuildsSuccess: (state, { payload }: PayloadAction<UserGuilds[]>) => {
      state.guilds = payload
    },

    setUserGuildsFailure: state => {
      state.guilds = []
    },
  },
})

export const logoutUser = () => async (dispatch: Dispatch) => {
  dispatch(setUserFailure())
}

export const fetchUser = () => async (dispatch: Dispatch) => {
  try {
    const user = await getUserInfo()
    dispatch(setUserSuccess(user))
  } catch (err) {
    dispatch(setUserFailure())
  }
}

export const fetchUserServers = () => async (dispatch: Dispatch) => {
  try {
    const guilds = await getUserGuilds()
    dispatch(setUserGuildsSuccess(guilds))
  } catch (err) {
    dispatch(setUserGuildsFailure())
  }
}

export const {
  setUserSuccess,
  setUserFailure,
  setUserGuildsSuccess,
  setUserGuildsFailure,
} = userSlice.actions

export default userSlice.reducer
