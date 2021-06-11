import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { ActiveServer, Server, ServerState } from './types'
import { getAllServers, getServer } from './server-api'

const initialState: ServerState = {
  loadingActiveServer: true,
  loadingAllServers: true,

  servers: [],
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

    setServersFailure: state => {
      state.loadingAllServers = false
      state.servers = []
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
  },
})

export const fetchAllServers = () => async (dispatch: Dispatch) => {
  try {
    const guilds = await getAllServers()
    dispatch(setServersSuccess(guilds))
  } catch (err) {
    dispatch(setServersFailure())
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

export const {
  setServersSuccess,
  setServersFailure,
  setActiveServerSuccess,
  setActiveServerFailure,
} = serverSlice.actions

export default serverSlice.reducer
