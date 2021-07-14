import {
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  Theme,
  Toolbar,
  useTheme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Head from 'next/head'
import React, { ReactNode, useState } from 'react'
import Footer from './Footer'
import Header from './Header'

type LayoutProps = {
  children?: ReactNode
  sideBarContent?: ReactNode
  title?: string
  sideBarEnabled?: boolean
}

const DRAWER_WIDTH = 240

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  mainContent: {
    minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
}))

export default function Layout({
  children,
  title = 'Payload | The TF2 Discord Bot',
  sideBarEnabled,
  sideBarContent,
}: LayoutProps) {
  const styles = useStyles()
  const theme = useTheme()

  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => setMobileOpen(prev => !prev)

  const drawer = (
    <>
      <div className={styles.toolbar} />
      <Divider />
      {sideBarContent}
    </>
  )

  const renderNav = (
    <nav className={styles.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: styles.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: styles.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )

  return (
    <div className={sideBarEnabled ? styles.root : ''}>
      <CssBaseline />
      <Head>
        <title>{title}</title>
      </Head>
      <Header
        handleMenuClick={handleDrawerToggle}
        sideBarEnabled={sideBarEnabled}
      />
      {sideBarEnabled && renderNav}
      <div className={sideBarEnabled ? styles.content : ''}>
        {sideBarEnabled && <Toolbar />}
        <main className={styles.mainContent}>{children}</main>
        <Footer />
      </div>
    </div>
  )
}
