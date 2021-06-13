export default function getServerAvatarNoSrc(serverName: string) {
  if (!serverName) return ''
  let avatarString = ''
  const wordsWithSpaces = serverName.split(' ')

  for (const word of wordsWithSpaces) {
    avatarString += word[0]
  }
  return avatarString
}
