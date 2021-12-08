import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { ActiveServer, Server, ServerState, UpdateServerDto } from './types'
import {
  deleteServerWebhook as deleteGuildWebhook,
  generateServerWebhook,
  getAllServers,
  getServer,
  patchServer,
} from './server-api'
import { Webhook } from '../shared/interfaces'

type ApiErrorData = {
  status: number
  error?: string
  message: string
}

const initialState: ServerState = {
  loadingActiveServer: true,
  loadingAllServers: true,
  passedBetaCheck: true,

  loadedServerCache: {},

  servers: null,
  activeServer: null,
  activeServerId: null,
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

    setActiveServerId: (state, { payload }: PayloadAction<string>) => {
      state.activeServerId = payload
      state.activeServer = state.loadedServerCache[payload]
    },

    loadingActiveServer: state => {
      state.loadingActiveServer = true
    },

    setActiveServerSuccess: (
      state,
      { payload }: PayloadAction<ActiveServer>,
    ) => {
      state.activeServerId = payload.id
      state.loadedServerCache[payload.id] = payload
      state.loadingActiveServer = false
      state.activeServer = payload
    },

    setActiveServerFailure: (state, { payload }: PayloadAction<string>) => {
      state.loadingActiveServer = false
      state.activeServer = null
      state.activeServerId = null
      state.loadingActiveServerErrorMsg =
        payload ?? 'Could not get server details'
    },

    updateActiveServerRestrictions: (
      state,
      { payload }: PayloadAction<string[]>,
    ) => {
      // Update both the active server AND the cache since caches are stupid
      state.activeServer.commands.restrictions = payload
      state.loadedServerCache[state.activeServerId].commands.restrictions =
        payload
    },

    updateActiveServerSuccess: (
      state,
      { payload }: PayloadAction<Partial<ActiveServer>>,
    ) => {
      state.activeServer = { ...state.activeServer, ...payload }
    },

    updateActiveServerFailure: (state, { payload }: PayloadAction<string>) => {
      state.updateActiveServerErrorMsg = payload ?? 'Failed to update server.'
    },

    setServerWebhookSuccess: (state, { payload }: PayloadAction<Webhook>) => {
      state.activeServer.webhook = payload
    },

    deleteServerWebhookSuccess: state => {
      state.activeServer.webhook = null
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
    dispatch(loadingActiveServer())
    const guild = await getServer(id)
    dispatch(setActiveServerSuccess(guild))
  } catch (err) {
    dispatch(setActiveServerFailure(err.response.data?.message))
  }
}

export const updateServer =
  (id: string, data: Partial<UpdateServerDto>) =>
  async (dispatch: Dispatch) => {
    try {
      await patchServer(id, data)
      dispatch(updateActiveServerSuccess(data))
    } catch (err) {
      dispatch(updateActiveServerFailure(err.response.data?.message))
    }
  }

export const updateServerRestrictions =
  (id: string, data: string[]) => async (dispatch: Dispatch) => {
    try {
      const { data: response } = await patchServer(id, {
        commandRestrictions: data,
      })

      dispatch(updateActiveServerRestrictions(response.commandRestrictions))
    } catch (err) {
      dispatch(updateActiveServerFailure(err.response.data?.message))
    }
  }

export const createServerWebhook =
  (guildId: string, channelId: string) => async (dispatch: Dispatch) => {
    try {
      const webhook = await generateServerWebhook(guildId, channelId)
      dispatch(setServerWebhookSuccess(webhook))
    } catch (err) {
      // I don't know what to do here yet.
    }
  }

export const deleteServerWebhook =
  (guildId: string) => async (dispatch: Dispatch) => {
    try {
      await deleteGuildWebhook(guildId)
      dispatch(deleteServerWebhookSuccess())
    } catch (err) {
      // I don't know what to do here yet.
    }
  }

export const {
  setServersSuccess,
  setServersFailure,
  setActiveServerId,
  loadingActiveServer,
  updateActiveServerRestrictions,
  setActiveServerSuccess,
  setActiveServerFailure,
  updateActiveServerSuccess,
  updateActiveServerFailure,
  setServerWebhookSuccess,
  deleteServerWebhookSuccess,
} = serverSlice.actions

export default serverSlice.reducer
