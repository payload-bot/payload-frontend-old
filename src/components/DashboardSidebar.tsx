import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ActiveServer } from '../redux/servers/types'

import SettingsIcon from '@material-ui/icons/Settings'
import BuildIcon from '@material-ui/icons/Build'
import HomeIcon from '@material-ui/icons/Home'

export default function DashboardSidebar(props: ActiveServer) {
  const router = useRouter()

  return (
    <>
      <List component="aside" aria-label="main sidebar">
        <Link href={`/dashboard/${props.id}`}>
          <ListItem button selected={router.pathname === '/dashboard/[id]'}>
            <ListItemIcon>
				<HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href={`/dashboard/${props.id}/settings`}>
          <ListItem button selected={router.pathname === '/dashboard/[id]/settings'}>
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Configure" />
          </ListItem>
        </Link>
      </List>
    </>
  )
}
