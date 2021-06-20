export interface Server {
  iconUrl: string
  isPayloadIn: boolean
  id: string
  name: string
  icon: string
  owner: boolean
  permissions: number
  permissions_new: number
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
  guild: {
    channels: Array<{ id: string; name: string }>
  }
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
