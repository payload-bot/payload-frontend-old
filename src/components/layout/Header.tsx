import React, { useState, MouseEvent } from 'react'
import Link from 'next/link'
import useUser from '../hooks/useUser'

import Avatar from '@material-ui/core/Avatar'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { Divider, ListItemIcon, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

type HeaderProps = {
  sideBarEnabled?: boolean
  handleMenuClick: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  payloadTitle: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  avatarSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  avatarLarge: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  displaceAppbar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - 240px)`,
      marginLeft: 240,
    },
  },
}))

export default function Header({
  sideBarEnabled,
  handleMenuClick,
}: HeaderProps) {
  const { user, loggedIn, loading, logout } = useUser()
  const styles = useStyles()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = user && (
    <Menu
      keepMounted
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      disableScrollLock={true}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href="/">
          <Typography className="link no-underline">Home</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/settings">
          <Typography className="link no-underline">Settings</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/dashboard">
          <Typography className="link no-underline">Dashboard</Typography>
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <Typography color="red">Logout</Typography>
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = user && (
    <Menu
      keepMounted
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/">
          <Typography className="link no-underline">Home</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/settings">
          <Typography className="link no-underline">Settings</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/dashboard">
          <Typography className="link no-underline">Dashboard</Typography>
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <Typography color="red">Logout</Typography>
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar
        position="fixed"
        className={sideBarEnabled ? styles.displaceAppbar : ''}
      >
        <Toolbar>
          {sideBarEnabled && (
            <IconButton
              edge="start"
              className={styles.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography className={styles.payloadTitle} variant="h6" noWrap>
            <Link href="/">
              <Typography className="link no-underline">Payload</Typography>
            </Link>
          </Typography>

          <div className={styles.grow} />

          <div className={styles.sectionDesktop}>
            {loggedIn && user && (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar className={styles.avatarLarge} src={user.avatar} />
              </IconButton>
            )}
          </div>

          <div className={styles.sectionMobile}>
            {loggedIn && user && (
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            )}
          </div>

          <div>
            {loading && 'Payload User'}
            {!loggedIn && !loading && (
              <Link href="/login">
                <Button variant="text" color="primary">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {!sideBarEnabled && <Toolbar />}
      {renderMobileMenu}
      {renderMenu}
    </>
  )
}
