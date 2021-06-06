export interface CommandArgs {
  name: string
  description: string
  required: boolean
  type: string
}

export interface Subcommand {
  [name: string]: Command
}

export interface Command {
  name: string
  description: string
  args: CommandArgs[]
  permissions: string[]
  canBeExecutedBy: string[]
  zones: string[]
  requiresRoot: boolean
  subCommands: Subcommand
  commandLadder: string[]
}

export interface AutoCommand {
  name: string
  description: string
  permissions: string[]
  zones: string[]
}

export interface CommandResponse {
  commands: {
    count: number
    data: Command[]
  }
  autoResponses: {
    count: number
    data: AutoCommand[]
  }
  version: string
}
