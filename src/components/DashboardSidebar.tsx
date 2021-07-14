import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ActiveServer } from '../redux/servers/types'

import SettingsIcon from '@material-ui/icons/Settings'
import BuildIcon from '@material-ui/icons/Build'
import HomeIcon from '@material-ui/icons/Home'
import BackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles(() => ({
  sideList: {
    height: '100%',
  },
}))

export default function DashboardSidebar(props: ActiveServer) {
  const router = useRouter()
  const styles = useStyles()

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <List
        component="aside"
        aria-label="main sidebar"
        className={styles.sideList}
        disablePadding
      >
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
      </List>
      <List disablePadding>
        <Divider />
        <Link href={`/dashboard`}>
          {/* Lol, this is never going to happen... */}
          <ListItem button selected={router.pathname === '/dashboard'}>
            <ListItemIcon>
              <BackIcon />
            </ListItemIcon>
            <ListItemText primary="Back" />
          </ListItem>
        </Link>
      </List>
    </Box>
  )
}
