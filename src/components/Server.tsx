import Link from 'next/link'
import { Avatar, Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Server } from '../redux/servers/types'

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

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className={styles.container}
    >
      <Box display="flex" alignItems="center" gridGap={5}>
        <Avatar src={server.iconUrl} />
        <Typography variant="body1">{server.name}</Typography>
      </Box>
      {server.isPayloadIn ? (
        <Link href={`/dashboard/${server.id}`}>
          <Button variant="contained" color="primary">
            Go to Dashboard
          </Button>
        </Link>
      ) : (
        <Link href={`/invite`}>
          <Button variant="contained" color="secondary">
            Invite
          </Button>
        </Link>
      )}
    </Box>
  )
}
