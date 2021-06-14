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
  const {
    activeServer,
    activeServerId,
    passedBetaCheck,
    loadingActiveServer,
    loadingActiveServerErrorMsg,
    loadedServerCache,
  } = useAppSelector(state => state.servers)

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm()

  const watchPrefix = watch('prefix')

  const onSubmit = (data: Partial<ActiveServer>) =>
    dispatch(updateServer(id as string, data))

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
    <Layout sideBar={!loadingActiveServer}>
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

        {!loadingActiveServer && !passedBetaCheck && (
          <Container>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="35vh"
            >
              <Typography>You are not a beta tester :(</Typography>
            </Box>
          </Container>
        )}

        {!loadingActiveServer &&
          passedBetaCheck &&
          loadingActiveServerErrorMsg && (
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
                    rules={{
                      min: 1,
                      max: 100,
                      required: 'Invalid nickname',
                    }}
                    render={({ field }) => (
                      <TextField
                        autoComplete="false"
                        error={errors.botName ? true : false}
                        helperText={errors.botName && errors.botName.message}
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
                    rules={{
                      minLength: 1,
                      maxLength: 75,
                      required: 'You need a prefix!',
                    }}
                    render={({ field }) => (
                      <TextField
                        autoComplete="false"
                        error={errors.prefix ? true : false}
                        helperText={
                          !!watchPrefix && !errors.botName
                            ? `Usage: ${watchPrefix}commands`
                            : errors.prefix
                            ? errors.prefix.message
                            : ''
                        }
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
                  <Box mt={3}>
                    <Button type="submit" color="primary">
                      Save
                    </Button>
                  </Box>
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
