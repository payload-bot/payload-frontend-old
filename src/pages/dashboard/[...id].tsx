import { useRouter } from 'next/router'
import withAuth from '../../components/withAuth'
import Layout from '../../components/layout/Layout'
import { useDispatch } from 'react-redux'
import React, { FormEvent, useEffect } from 'react'
import { fetchServer, updateServer } from '../../redux/servers/serverSlice'
import { useAppSelector } from '../../redux/store'
import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
  Button,
} from '@material-ui/core'
import ServerAvatar from '../../components/ServerAvatar'
import { Controller, useForm } from 'react-hook-form'
import { ActiveServer } from '../../redux/servers/types'

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: '35%',
  },
}))

function ServerDashboardPage() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const styles = useStyles()
  const { control, reset, handleSubmit } = useForm()

  const onSubmit = (data: Partial<ActiveServer>) =>
    dispatch(updateServer(id as string, data))

  const { activeServer, passedBetaCheck, loadingActiveServer } = useAppSelector(
    state => state.servers,
  )

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
            <Card className={styles.card}>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Typography variant="h5" style={{ margin: 8 }}>
                    Bot name
                  </Typography>
                  <Controller
                    name="botName"
                    control={control}
                    defaultValue={activeServer.botName}
                    render={({ field }) => (
                      <TextField
                        autoComplete="false"
                        {...field}
                        style={{ margin: 8 }}
                      />
                    )}
                  />
                  <Typography variant="h5" style={{ margin: 8 }}>
                    Prefix
                  </Typography>
                  <Controller
                    name="prefix"
                    control={control}
                    defaultValue={activeServer.prefix}
                    render={({ field }) => (
                      <TextField
                        autoComplete="false"
                        {...field}
                        style={{ margin: 8 }}
                      />
                    )}
                  />
                  <Typography variant="h5" style={{ margin: 8 }}>
                    Language
                  </Typography>
                  <Controller
                    name="language"
                    control={control}
                    defaultValue={activeServer.language}
                    render={({ field }) => (
                      <Select {...field} style={{ margin: 8 }}>
                        <MenuItem value="en-US">English</MenuItem>
                        <MenuItem value="es-ES">Spanish</MenuItem>
                        <MenuItem value="fi-FI">Finnish</MenuItem>
                        <MenuItem value="pl-PL">Polish</MenuItem>
                      </Select>
                    )}
                  />
                  <br />
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Container>
        )}
      </Container>
    </Layout>
  )
}

export default withAuth(ServerDashboardPage)
