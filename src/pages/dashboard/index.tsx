import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@material-ui/core'
import Layout from '../../components/layout/Layout'
import Server from '../../components/Server'
import withAuth from '../../components/withAuth'
import { fetchAllServers } from '../../redux/servers/serverSlice'
import { useAppSelector } from '../../redux/store'

function DashboardPage() {
  const dispatch = useDispatch()
  const { servers, loadingAllServers } = useAppSelector(state => state.servers)

  useEffect(() => {
    if (loadingAllServers) dispatch(fetchAllServers())
  }, [])

  return (
    <Layout>
      <Container>
        {loadingAllServers && (
          <Stack justifyContent="center" alignItems="center" height="35vh">
            <CircularProgress size={50} />
            <Typography align="center" variant="h5">
              <Box py={2}>Loading servers</Box>
            </Typography>
          </Stack>
        )}

        {!loadingAllServers && !servers && (
          <Stack justifyContent="center" alignItems="center" height="50vh">
            <Typography align="center" variant="h5">
              <Box py={2}>
                Uh oh! You have no servers to manage. You should add Payload to
                a server!
              </Box>
              <Link href="/">
                <Button variant="outlined" color="primary">
                  Take me back
                </Button>
              </Link>
            </Typography>
          </Stack>
        )}

        {!loadingAllServers && servers && (
          <Container maxWidth="md">
            <Typography align="center" variant="h4">
              <Box py={3}>Choose a Server</Box>
            </Typography>
            <Stack gap={2}>
              {servers.map(server => (
                <Server key={server.id} server={server} />
              ))}
            </Stack>
          </Container>
        )}
      </Container>
    </Layout>
  )
}

export default withAuth(DashboardPage)
