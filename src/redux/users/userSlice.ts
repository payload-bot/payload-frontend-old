import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { User, UserState } from './types'
import {
  deleteWebhook,
  generateUserWebhook,
  getUserInfo,
  patchUser,
} from './user-api'

const initialState: UserState = {
  isAdmin: false,
  loggedIn: false,

  user: null,
  loading: true,

  updateUserErrorMsg: null,
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

    setUserWebhookSuccess: (
      state,
      { payload }: PayloadAction<{ data: string }>,
    ) => {
      state.user.webhook = payload.data
    },

    deleteUserWebhookSuccess: state => {
      state.user.webhook = null
    },

    updateUserSuccess: (state, { payload }: PayloadAction<Partial<User>>) => {
      state.updateUserErrorMsg = null
      state.user = { ...state.user, ...payload }
    },

    updateUserFailure: (state, { payload }: PayloadAction<string>) => {
      state.updateUserErrorMsg = payload
    },

    resetUpdateUserFailureMsg: state => {
      state.updateUserErrorMsg = null
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

export const updateUser =
  (data: Partial<User>) => async (dispatch: Dispatch) => {
    dispatch(resetUpdateUserFailureMsg)
    try {
      await patchUser(data)
      dispatch(updateUserSuccess(data))
    } catch (err) {
      dispatch(updateUserFailure(err.response.data?.message))
    }
  }

export const createUserWebhook = () => async (dispatch: Dispatch) => {
  try {
    const webhook = await generateUserWebhook()
    dispatch(setUserWebhookSuccess(webhook))
  } catch (err) {
    // I don't know what to do here yet.
  }
}

export const deleteUserWebhook = () => async (dispatch: Dispatch) => {
  try {
    await deleteWebhook()
    dispatch(deleteUserWebhookSuccess())
  } catch (err) {
    // I don't know what to do here yet.
  }
}

export const {
  setUserSuccess,
  setUserFailure,
  logoutUser,
  setLoadingUser,
  setUserWebhookSuccess,
  updateUserSuccess,
  updateUserFailure,
  deleteUserWebhookSuccess,
  resetUpdateUserFailureMsg,
} = userSlice.actions

export default userSlice.reducer
