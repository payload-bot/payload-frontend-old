import { Avatar, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import getServerAvatarNoSrc from '../lib/getAvatarWithNoSource'

const useStyles = makeStyles((theme: Theme) => ({
  guildAvatar: {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
    border: '1px solid #FAFAFA',
    height: 40,
    width: 40,
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 40,
    },
  },
}))

type ServerAvatarProps = {
  icon: string | null
  name: string
}

export default function ServerAvatar({ icon, name }: ServerAvatarProps) {
  const styles = useStyles()

  return icon ? (
    <Avatar src={icon} />
  ) : (
    <Avatar className={styles.guildAvatar}>{getServerAvatarNoSrc(name)}</Avatar>
  )
}
