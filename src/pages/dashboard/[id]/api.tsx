import { useRouter } from 'next/router'
import withAuth from '../../../components/withAuth'
import Layout from '../../../components/layout/Layout'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { fetchServer } from '../../../redux/servers/serverSlice'
import { useAppSelector } from '../../../redux/store'
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Stack,
} from '@material-ui/core'
import ServerAvatar from '../../../components/ServerAvatar'
import DashboardSidebar from '../../../components/DashboardSidebar'
import DashboardApiSettings from '../../../components/dashboard/settings/DashboardApiSettings'

function DashboardApiSettingsPage() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()

  const {
    activeServer,
    activeServerId,
    loadingActiveServer,
    loadingActiveServerErrorMsg,
    loadedServerCache,
  } = useAppSelector(state => state.servers)

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

            <DashboardApiSettings />
          </Container>
        )}
      </Container>
    </Layout>
  )
}

export default withAuth(DashboardApiSettingsPage)
