import { useRouter } from 'next/router'
import withAuth from '../../components/withAuth'
import Layout from '../../components/layout/Layout'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { fetchServer } from '../../redux/servers/serverSlice'
import { useAppSelector } from '../../redux/store'
import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
  Box,
} from '@material-ui/core'
import ServerAvatar from '../../components/ServerAvatar'

const useStyles = makeStyles(theme => ({}))

function ServerDashboardPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const styles = useStyles()

  const { activeServer, passedBetaCheck, loadingActiveServer } = useAppSelector(
    state => state.servers,
  )
  const { id } = router.query

  useEffect(() => {
    if (loadingActiveServer) dispatch(fetchServer(id as string))
  }, [id])

  return (
    <Layout sideBar>
      <Container>
        {loadingActiveServer && (
          <Container>
            <CircularProgress size={40} />
          </Container>
        )}

        {!loadingActiveServer && !passedBetaCheck && (
          <Container>
            <Typography>You are not a beta tester :(</Typography>
          </Container>
        )}

        {!loadingActiveServer && passedBetaCheck && activeServer && (
          <Container>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              py={2}
            >
              <ServerAvatar icon={activeServer.icon} name={activeServer.name} />
              <Typography variant="h6">{activeServer.name}</Typography>
            </Box>
          </Container>
        )}
      </Container>
    </Layout>
  )
}

export default withAuth(ServerDashboardPage)
