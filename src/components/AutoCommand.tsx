import { AutoCommand as AC } from '../interfaces/command'

const HTML_SPACE = '&nbsp;'
const HTML_INDENT = HTML_SPACE.repeat(4)

type CommandProps = {
  command: AC
}

const AutoCommand = ({ command }: CommandProps) => {
  const html = codeBlock(command)
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>
}

function indent(amount = 1) {
  return '|' + HTML_INDENT.repeat(amount).slice(6)
}

function codeBlock(command: AC) {
  const commandName = command.name

  let commandsHTML = ''
  commandsHTML += `<code id="${commandName.replace(
    / /g,
    '-',
  )}" class="command-block"><strong>${commandName}</strong>: <span class="syntax-highlight">${
    command.description
  }</span><br>`


  // commandsHTML += `|<br>${indent()}Pattern:<br>`
  // commandsHTML += `|<br>${indent(2)}${command.pattern}:<br>`
  
  commandsHTML += `|<br>${indent()}Permissions:<br>`
  command.permissions.forEach(permission => {
    commandsHTML += `${indent(2)}${permission}<br>`
  })

  commandsHTML += `|<br>${indent()}Zones:<br>`
  command.zones.forEach(zone => {
    commandsHTML += `${indent(2)}${zone}<br>`
  })


  commandsHTML += '</code></a>'

  return commandsHTML
}


export default AutoCommand
