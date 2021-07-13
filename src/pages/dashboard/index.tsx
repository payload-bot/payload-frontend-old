import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@material-ui/core'
import Layout from '../../components/layout/Layout'
import Server from '../../components/Server'
import withAuth from '../../components/withAuth'
import { fetchAllServers } from '../../redux/servers/serverSlice'
import { useAppSelector } from '../../redux/store'

function DashboardPage() {
  const dispatch = useDispatch()
  const { servers, loadingAllServers, passedBetaCheck } = useAppSelector(
    state => state.servers,
  )

  useEffect(() => {
    if (loadingAllServers) dispatch(fetchAllServers())
  }, [])

  return (
    <Layout>
      <Container>
        {loadingAllServers && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            height="50vh"
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={50} />
            </Box>
            <Typography align="center" variant="h5">
              <Box py={2}>Loading servers...</Box>
            </Typography>
          </Box>
        )}

        {!loadingAllServers && !servers && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            height="50vh"
          >
            <Typography align="center" variant="h5">
              <Box py={2}>
                {passedBetaCheck
                  ? 'Uh oh! You have no servers to manage.'
                  : 'This feature is open to beta users only.'}
              </Box>
              <Box>
                <Link href="/">
                  <Button variant="outlined" color="primary">
                    Take me back
                  </Button>
                </Link>
              </Box>
            </Typography>
          </Box>
        )}

        {!loadingAllServers && servers && (
          <Container maxWidth="md">
            <Box mb={7}>
              <Typography align="center" variant="h4">
                <Box py={5}>Choose a Server</Box>
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                {servers.map(server => (
                  <Server key={server.id} server={server} />
                ))}
              </Box>
            </Box>
          </Container>
        )}
      </Container>
    </Layout>
  )
}

export default withAuth(DashboardPage)
