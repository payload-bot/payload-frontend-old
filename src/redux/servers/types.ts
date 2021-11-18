import { Webhook } from '../shared/interfaces'

export interface Server {
  isPayloadIn: boolean
  name: string
  id: string
  icon: string | null
  features: string[]
  owner: boolean
  permissions: string
}

interface Fun {
  payloadFeetPushed: number
}

export interface Restriction {
  commands: Set<string>
  channelID: string
}

export interface ActiveServer {
  id: string
  fun: Fun
  commands: {
    restrictions: Restriction[]
    commands: string[]
    autoResponses: string[]
  }
  channels: Array<{ id: string; name: string }>
  webhook: Webhook
  enableSnipeForEveryone: boolean
  icon: string
  botName: string
  language: string
  name: string
  prefix: string
}

export interface ServerState {
  loadingAllServers: boolean
  loadingActiveServer: boolean

  passedBetaCheck: boolean

  servers: Server[]
  activeServer: ActiveServer | null
  activeServerId: string

  loadedServerCache: {
    [id: string]: ActiveServer
  }

  // Loading Errors
  loadingActiveServerErrorMsg?: string

  // Updating Errors
  updateActiveServerErrorMsg?: string
}
