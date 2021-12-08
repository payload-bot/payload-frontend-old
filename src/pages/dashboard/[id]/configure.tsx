import { useRouter } from 'next/router'
import withAuth from '../../../components/withAuth'
import Layout from '../../../components/layout/Layout'
import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { fetchServer, updateServer } from '../../../redux/servers/serverSlice'
import { useAppSelector } from '../../../redux/store'
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Stack,
  Snackbar,
  Paper,
} from '@material-ui/core'
import ServerAvatar from '../../../components/ServerAvatar'
import DashboardSidebar from '../../../components/DashboardSidebar'
import ConfigureCommands from '../../../components/dashboard/configure/ConfigureCommands'
import useUpdateEffect from '../../../components/hooks/useUpdateEffect'

function DashboardConfigureCommands() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()

  const [commandsToRestrict, setCommandsToRestrict] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  const {
    activeServer,
    activeServerId,
    loadingActiveServer,
    loadingActiveServerErrorMsg,
    loadedServerCache,
  } = useAppSelector(state => state.servers)

  function notifyFunction(cmdName: string, checked: boolean) {
    setSaving(true)
    if (checked) {
      setCommandsToRestrict([...commandsToRestrict, cmdName])
    } else {
      const elementsChecked = commandsToRestrict.filter(cmd => cmd !== cmdName)
      setCommandsToRestrict(elementsChecked)
    }
  }

  // @TODO: refactor :/
  useUpdateEffect(() => {
    if (loadingActiveServer) return

    const timer = setTimeout(() => {
      dispatch(
        updateServer(activeServer?.id, {
          commandRestrictions: commandsToRestrict,
        }),
      )

      setSaving(false)
    }, 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [commandsToRestrict])

  useEffect(() => {
    if (activeServer) {
      setCommandsToRestrict(activeServer?.commands.restrictions)
    }
  }, [loadingActiveServer])

  useEffect(() => {
    if (loadingActiveServerErrorMsg) {
      router.push('/dashboard')
    }
  }, [loadingActiveServerErrorMsg])

  useEffect(() => {
    if (!loadedServerCache[id as string]) {
      dispatch(fetchServer(id as string))
    }
  }, [activeServerId])

  return (
    <Layout
      sideBarEnabled={!loadingActiveServer}
      sideBarContent={<DashboardSidebar {...activeServer} />}
    >
      <Container>
        {loadingActiveServer && (
          <Container>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="35vh"
            >
              <CircularProgress size={40} />
              <Typography variant="h5">Loading your dashboard</Typography>
            </Box>
          </Container>
        )}

        {!loadingActiveServer && loadingActiveServerErrorMsg && (
          <Container>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="35vh"
            >
              <Typography>{loadingActiveServerErrorMsg}</Typography>
            </Box>
          </Container>
        )}

        {!loadingActiveServer && activeServer && (
          <Container>
            <Stack alignItems="center" py={2}>
              <ServerAvatar icon={activeServer.icon} name={activeServer.name} />
              <Typography variant="h6">{activeServer.name}</Typography>
            </Stack>

            <ConfigureCommands
              notifyFunction={notifyFunction}
              restrictions={activeServer!.commands.restrictions}
              commands={activeServer!.commands.commands}
              autoResponses={activeServer!.commands.autoResponses}
            />
          </Container>
        )}

        <Snackbar
          open={saving}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Paper>
            <Box p={1}>{saving ? 'Saving...' : 'Saved!'}</Box>
          </Paper>
        </Snackbar>
      </Container>
    </Layout>
  )
}

export default withAuth(DashboardConfigureCommands)
