import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { ActiveServer, Server, ServerState } from './types'
import { getAllServers, getServer, patchServer } from './server-api'

type ApiErrorData = {
  status: number
  error?: string
  message: string
}

const initialState: ServerState = {
  loadingActiveServer: true,
  loadingAllServers: true,
  passedBetaCheck: true,

  servers: null,
  activeServer: null,
}

export const serverSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setServersSuccess: (state, { payload }: PayloadAction<Server[]>) => {
      state.loadingAllServers = false
      state.servers = payload
    },

    setServersFailure: (state, { payload }: PayloadAction<ApiErrorData>) => {
      state.loadingAllServers = false
      state.servers = null
      if (payload.message === 'Not a beta user') {
        state.passedBetaCheck = false
      }
    },

    setActiveServerSuccess: (
      state,
      { payload }: PayloadAction<ActiveServer>,
    ) => {
      state.loadingActiveServer = false
      state.activeServer = payload
    },

    setActiveServerFailure: state => {
      state.loadingActiveServer = false
      state.activeServer = null
    },

    updateActiveServerSuccess: (
      state,
      { payload }: PayloadAction<Partial<ActiveServer>>,
    ) => {
      state.activeServer = { ...state.activeServer, ...payload }
    },
  },
})

export const fetchAllServers = () => async (dispatch: Dispatch) => {
  try {
    const guilds = await getAllServers()
    dispatch(setServersSuccess(guilds))
  } catch (err) {
    dispatch(setServersFailure(err.response?.data))
  }
}

export const fetchServer = (id: string) => async (dispatch: Dispatch) => {
  try {
    const guild = await getServer(id)
    dispatch(setActiveServerSuccess(guild))
  } catch (err) {
    dispatch(setActiveServerFailure())
  }
}

export const updateServer =
  (id: string, data: Partial<ActiveServer>) => async (dispatch: Dispatch) => {
    try {
      await patchServer(id, data)
      dispatch(updateActiveServerSuccess(data))
    } catch (err) {
      console.warn('Could not dispatch event: ' + err)
    }
  }

export const {
  setServersSuccess,
  setServersFailure,
  setActiveServerSuccess,
  setActiveServerFailure,
  updateActiveServerSuccess,
} = serverSlice.actions

export default serverSlice.reducer
