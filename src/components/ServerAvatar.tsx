import { Avatar, makeStyles } from '@material-ui/core'
import getServerAvatarNoSrc from '../lib/getAvatarWithNoSource'

const useStyles = makeStyles(theme => ({
  guildAvatar: {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
    border: '1px solid #FAFAFA',
    height: 50,
    width: 50,
    [theme.breakpoints.down('sm')]: {
      height: 50,
      width: 50,
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
