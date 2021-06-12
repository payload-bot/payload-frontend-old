import { useRouter } from 'next/router'
import withAuth from '../../components/withAuth'
import Layout from '../../components/layout/Layout'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { fetchServer } from '../../redux/servers/serverSlice'
import { useAppSelector } from '../../redux/store'
import { Avatar, CircularProgress, Container, Typography } from '@material-ui/core'

function ServerDashboardPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { activeServer, passedBetaCheck, loadingActiveServer } = useAppSelector(
    state => state.servers,
  )
  const { id } = router.query

  useEffect(() => {
    dispatch(fetchServer(id as string))
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
            <Typography>You are not a beta tester :()</Typography>
          </Container>
        )}
        {!loadingActiveServer && passedBetaCheck && activeServer && (
          <Container>
            <Avatar src={activeServer.icon} />
            <Typography variant='h6'>{activeServer.name}</Typography>
          </Container>
        )}
      </Container>
    </Layout>
  )
}

export default withAuth(ServerDashboardPage)
