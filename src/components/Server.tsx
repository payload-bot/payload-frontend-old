import Link from 'next/link'
import {
  Box,
  Button,
  Hidden,
  IconButton,
  Stack,
  Theme,
  Typography,
} from '@material-ui/core'
import RightArrow from '@material-ui/icons/ChevronRight'

import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux'
import { Server } from '../redux/servers/types'
import ServerAvatar from '../components/ServerAvatar'
import { setActiveServerId } from '../redux/servers/serverSlice'
import { useAppSelector } from '../redux/store'

type ServerProps = {
  server: Server
}

const useStyles = makeStyles((theme: Theme) => ({
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

  const dashboardButton = (
    <>
      <Hidden smDown implementation="css">
        <Link href={`/dashboard/${server.id}`}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setActiveServer}
          >
            Go to Dashboard
          </Button>
        </Link>
      </Hidden>
      <Hidden smUp implementation="css">
        <Link href={`/dashboard/${server.id}`}>
          <IconButton onClick={() => setActiveServer}>
            <RightArrow fontSize="large" />
          </IconButton>
        </Link>
      </Hidden>
    </>
  )

  const openInviteLinkInWindow = () => {
    window.open('https://payload.tf/invite', '_blank', 'height=750,width=500')
  }

  return (
    <Stack
      justifyContent="space-between"
      alignItems="center"
      direction="row"
      className={styles.container}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <ServerAvatar icon={server.iconUrl} name={server.name} />

        <Typography variant="body1">{server.name}</Typography>
      </Stack>
      {server.isPayloadIn ? (
        dashboardButton
      ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={openInviteLinkInWindow}
        >
          Invite
        </Button>
      )}
    </Stack>
  )
}
