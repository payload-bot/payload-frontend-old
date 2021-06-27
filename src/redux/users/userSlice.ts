import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { User, UserState } from './types'
import { getUserInfo } from './user-api'

const initialState: UserState = {
  loading: true,
  isAdmin: false,
  loggedIn: false,
  user: null,
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserSuccess: (state, { payload }: PayloadAction<User>) => {
      state.loading = false
      state.loggedIn = true
      state.isAdmin = payload.isAdmin
      state.user = payload
    },

    setUserFailure: state => {
      state.loading = false
      state.loggedIn = false
      state.user = null
    },

    logoutUser: state => {
      state.isAdmin = false
      state.loading = false
      state.loggedIn = false
      state.user = null
    },

    setLoadingUser: state => {
      state.loading = false
    },
  },
})

export const fetchUser = () => async (dispatch: Dispatch) => {
  try {
    const user = await getUserInfo()
    dispatch(setUserSuccess(user))
  } catch (err) {
    dispatch(setUserFailure())
  }
}

export const { 
  setUserSuccess, 
  setUserFailure, 
  logoutUser,
  setLoadingUser
} = userSlice.actions

export default userSlice.reducer
