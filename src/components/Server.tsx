import Link from 'next/link'
import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { Server } from '../redux/servers/types'
import ServerAvatar from '../components/ServerAvatar'
import { setActiveServerId } from '../redux/servers/serverSlice'
import { useAppSelector } from '../redux/store'

type ServerProps = {
  server: Server
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    borderRadius: 5,
    '&:hover': {
      transition: `${theme.transitions.duration.short}ms`,
      backgroundColor: '#222',
    },
  },
}))

export default function ServerSelection({ server }: ServerProps) {
  const styles = useStyles()
  const dispatch = useDispatch()
  const { activeServerId } = useAppSelector(state => state.servers)

  const setActiveServer = () => {
    if (activeServerId !== server.id) {
      dispatch(setActiveServerId(server.id))
    }
  }

  const openInviteLinkInWindow = () => {
    window.open('https://payload.tf/invite', '_blank', 'height=750,width=500')
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className={styles.container}
    >
      <Box display="flex" alignItems="center" gridGap={5}>
        <ServerAvatar icon={server.iconUrl} name={server.name} />

        <Typography variant="body1">{server.name}</Typography>
      </Box>
      {server.isPayloadIn ? (
        <Link href={`/dashboard/${server.id}`}>
          <Button variant="contained" color="primary" onClick={setActiveServer}>
            Go to Dashboard
          </Button>
        </Link>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={openInviteLinkInWindow}
        >
          Invite
        </Button>
      )}
    </Box>
  )
}
