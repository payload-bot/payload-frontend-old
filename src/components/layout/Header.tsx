import React, { useState, MouseEvent } from 'react'
import Link from 'next/link'
import useUser from '../hooks/useUser'

import { makeStyles, Theme } from '@material-ui/core/styles'
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
import { Divider } from '@material-ui/core'

type HeaderProps = {
  sideBar?: boolean
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
  title: {
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
  logOut: {
    color: theme.palette.error.dark,
  },
  displaceAppbar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - 240px)`,
      marginLeft: 240,
    },
  },
}))

export default function Header({ sideBar, handleMenuClick }: HeaderProps) {
  const { user, loggedIn, logout } = useUser()
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
        <Link href="/dashboard">
          <Typography className="link no-underline">Dashboard</Typography>
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem onClick={logout} className={styles.logOut}>
        Logout
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
      onClose={handleMenuClick}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <Avatar className={styles.avatarSmall} src={user.avatar} />
        <p>{user.name}</p>
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar position="fixed" className={sideBar && styles.displaceAppbar}>
        <Toolbar>
          {sideBar && (
            <IconButton
              edge="start"
              className={styles.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon onClick={handleMenuClick} />
            </IconButton>
          )}

          <Typography className={styles.title} variant="h6" noWrap>
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
            {!loggedIn && (
              <Link href="/login">
                <Button variant="text" color="secondary">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {!sideBar && <Toolbar />}
      {renderMobileMenu}
      {renderMenu}
    </>
  )
}
