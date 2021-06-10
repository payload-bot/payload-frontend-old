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
  language: string
  prefix: string
}

export interface ServerState {
  servers: Server[]

  activeServer: never | null
}
