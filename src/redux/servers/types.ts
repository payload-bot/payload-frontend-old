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

interface Restriction {
  commands: string[]
  channelID: string
}

export interface ActiveServer {
  restrictions: Restriction[]
  fun: Fun
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
}
