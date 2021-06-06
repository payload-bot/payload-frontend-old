import { Command as Cmd } from '../interfaces/command'

const HTML_SPACE = '&nbsp;'
const HTML_INDENT = HTML_SPACE.repeat(4)

type CommandProps = {
  command: Cmd
}

const Command = ({ command }: CommandProps) => {
  const html = codeBlock(command)
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>
}

function indent(amount = 1) {
  return '|' + HTML_INDENT.repeat(amount).slice(6)
}

function codeBlock(command: Cmd) {
  const commandName = getFullCommandName(command)

  let commandsHTML = ''
  commandsHTML += `<code id="${commandName.replace(
    / /g,
    '-',
  )}" class="command-block"><strong>${commandName}</strong>: <span class="syntax-highlight">${
    command.description
  }</span><br>`

  commandsHTML += `|<br>${indent()}Usage:<br>${indent(
    2,
  )}<span class="syntax-highlight">${getUsage(command)}</span><br>`

  commandsHTML += `|<br>${indent()}Arguments:<br>`
  command.args.forEach(arg => {
    commandsHTML += `${indent(
      2,
    )}<span class="syntax-highlight">${argToString(
      arg,
    )}</span>: <span class="syntax-highlight">${arg.description}</span><br>`
  })
  if (command.args.length == 0) {
    commandsHTML += `${indent(2)}*NONE*<br>`
  }

  commandsHTML += `|<br>${indent()}Permissions:<br>`
  commandsHTML += `${indent(2)}For Payload:<br>`
  command.permissions.forEach(permission => {
    commandsHTML += `${indent(3)}${permission}<br>`
  })
  commandsHTML += `${indent(2)}For User:<br>`
  command.canBeExecutedBy.forEach(permission => {
    commandsHTML += `${indent(3)}${permission}<br>`
  })

  commandsHTML += `|<br>${indent()}Zones:<br>`
  command.zones.forEach(zone => {
    commandsHTML += `${indent(2)}${zone}<br>`
  })

  if (Object.keys(command.subCommands).length > 0) {
    commandsHTML += `|<br>${indent()}Subcommands:<br>`
    for (let subcommand in command.subCommands) {
      commandsHTML += `${indent(2)}${command.subCommands[subcommand].name}<br>`
    }
  }

  commandsHTML += '</code></a>'

  if (Object.keys(command.subCommands).length > 0) {
    for (let subcommand in command.subCommands) {
      commandsHTML += codeBlock(command.subCommands[subcommand])
    }
  }

  commandsHTML = commandsHTML
      .replace(/&lt;.+?&gt;/g, "<span style='color: #7289DA;'>$&</span>")
      .replace(/\[.+?\]/g, "<span style='color: #99AAB5;'>$&</span>")

  return commandsHTML
}

function getFullCommandName(cmd) {
  if (cmd.commandLadder.length > 0) {
    return `${cmd.commandLadder.join(' ')} ${cmd.name}`
  }

  return cmd.name
}

function argToString(arg) {
  let innerText = arg.name

  if (arg.options) {
    innerText = arg.options.join('|')
  }

  if (arg.required) {
    return `&lt;${innerText}&gt;`
  } else {
    return `[${innerText}]`
  }
}

function convertArgsToUsageString(cmd) {
  return cmd.args.map(argToString).join(' ')
}

function getUsage(cmd) {
  return `pls ${getFullCommandName(cmd)} ${convertArgsToUsageString(cmd)}`
}

export default Command
