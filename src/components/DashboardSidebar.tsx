import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  makeStyles,
} from '@material-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ActiveServer } from '../redux/servers/types'

import SettingsIcon from '@material-ui/icons/Settings'
import BuildIcon from '@material-ui/icons/Build'
import HomeIcon from '@material-ui/icons/Home'
import BackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles(theme => ({
  backButton: {
    marginTop: 'auto',
  },
}))

export default function DashboardSidebar(props: ActiveServer) {
  const router = useRouter()
  const styles = useStyles()

  return (
    <>
      <List component="aside" aria-label="main sidebar">
        <Box display="flex" flexDirection="column">
          <Link href={`/dashboard/${props.id}`}>
            <ListItem button selected={router.pathname === '/dashboard/[id]'}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link href={`/dashboard/${props.id}/settings`}>
            <ListItem
              button
              selected={router.pathname === '/dashboard/[id]/settings'}
            >
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary="Configure" />
            </ListItem>
          </Link>
          <Box display="flex" flexGrow={1}></Box>
          <Link href={`/dashboard`}>
            {/* Lol, this is never going to happen... */}
            <ListItem button selected={router.pathname === '/dashboard'}>
              <ListItemIcon>
                <BackIcon />
              </ListItemIcon>
              <ListItemText primary="Back" />
            </ListItem>
          </Link>
        </Box>
      </List>
    </>
  )
}
