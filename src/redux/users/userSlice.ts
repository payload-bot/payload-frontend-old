import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { Webhook } from '../shared/interfaces'
import { Profile, UserState } from './types'
import {
  deleteWebhook,
  fetchWebhookForUser,
  generateUserWebhook,
  getUserInfo,
  patchUser,
} from './user-api'

const initialState: UserState = {
  isAdmin: false,
  loggedIn: false,

  user: null,
  loading: true,

  webhook: null,

  updateUserErrorMsg: null,
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserSuccess: (state, { payload }: PayloadAction<Profile>) => {
      state.loading = false
      state.loggedIn = true
      state.isAdmin = payload.roles.includes('admin')
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

    setUserWebhookSuccess: (state, { payload }: PayloadAction<Webhook>) => {
      state.webhook = payload
    },

    deleteUserWebhookSuccess: state => {
      state.webhook = null
    },

    updateUserSuccess: (
      state,
      { payload }: PayloadAction<Partial<Profile>>,
    ) => {
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
  (data: Partial<Profile>) => async (dispatch: Dispatch) => {
    dispatch(resetUpdateUserFailureMsg)
    try {
      await patchUser(data)
      dispatch(updateUserSuccess(data))
    } catch (err) {
      dispatch(updateUserFailure(err.response.data?.message))
    }
  }

export const fetchUserWebhook = () => async (dispatch: Dispatch) => {
  try {
    const webhook = await fetchWebhookForUser()
    dispatch(setUserWebhookSuccess(webhook))
  } catch (err) {
    // I don't know what to do here yet.
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
