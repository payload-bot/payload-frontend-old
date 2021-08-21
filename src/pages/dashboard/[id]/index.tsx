import { useRouter } from 'next/router'
import withAuth from '../../../components/withAuth'
import Layout from '../../../components/layout/Layout'
import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { fetchServer, updateServer } from '../../../redux/servers/serverSlice'
import { useAppSelector } from '../../../redux/store'
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Card,
  CardContent,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Theme,
  FormControl,
  InputLabel,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ServerAvatar from '../../../components/ServerAvatar'
import { Controller, useForm } from 'react-hook-form'
import { ActiveServer } from '../../../redux/servers/types'
import DashboardSidebar from '../../../components/DashboardSidebar'
import { useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  card: {
    minWidth: '35%',
  },
}))

function ServerDashboardPage() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const styles = useStyles()
  const isMobileDevice = useMediaQuery<Theme>(theme =>
    theme.breakpoints.up('md'),
  )

  const {
    activeServer,
    activeServerId,
    loadingActiveServer,
    loadingActiveServerErrorMsg,
    loadedServerCache,
    updateActiveServerErrorMsg,
  } = useAppSelector(state => state.servers)

  const [serverUpdateSuccess, setUpdateServerSuccess] = useState(false)
  const [serverUpdateFailure, setUpdateServerFailure] = useState(false)

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm()

  const watchPrefix = watch('prefix', activeServer?.prefix)

  const onSubmit = (data: Partial<ActiveServer>) => {
    dispatch(updateServer(id as string, data))
    if (!updateActiveServerErrorMsg) {
      setUpdateServerSuccess(true)
    } else {
      setUpdateServerFailure(true)
    }
  }

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
            <Stack alignItems="center" justifyContent="center" height="35vh">
              <CircularProgress size={50} />
              <Typography variant="h5">Loading your dashboard</Typography>
            </Stack>
          </Container>
        )}

        {!loadingActiveServer && loadingActiveServerErrorMsg && (
          <Container>
            <Stack alignItems="center" justifyContent="center" height="35vh">
              <Typography>{loadingActiveServerErrorMsg}</Typography>
            </Stack>
          </Container>
        )}

        {!loadingActiveServer && activeServer && (
          <Container>
            <Stack alignItems="center" py={2}>
              <ServerAvatar icon={activeServer.icon} name={activeServer.name} />
              <Typography variant="h6">{activeServer.name}</Typography>
            </Stack>
            <Card className={styles.card}>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid
                    container
                    mt={1}
                    mb={3}
                    spacing={3}
                    direction={isMobileDevice ? 'row' : 'column'}
                  >
                    <Grid item xs={8}>
                      <Controller
                        name="botName"
                        control={control}
                        defaultValue={activeServer.botName}
                        rules={{
                          minLength: 1,
                          maxLength: 100,
                          required: 'Invalid nickname',
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            label="Bot Name"
                            autoComplete="false"
                            error={errors.botName ? true : false}
                            helperText={
                              errors.botName && errors.botName.message
                            }
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
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
                            label="Prefix"
                            autoComplete="false"
                            error={errors.prefix ? true : false}
                            helperText={
                              !errors.botName
                                ? `Usage: ${watchPrefix ?? activeServer.prefix}commands`
                                : errors.prefix
                                ? errors.prefix.message
                                : ''
                            }
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <InputLabel id="language-select-label">
                          Language
                        </InputLabel>
                        <Controller
                          name="language"
                          control={control}
                          defaultValue={activeServer.language}
                          render={({ field }) => (
                            <Select
                              {...field}
                              labelId="language-select-label"
                              label="Language"
                            >
                              <MenuItem value="en-US">English</MenuItem>
                              <MenuItem value="es-ES">Spanish</MenuItem>
                              <MenuItem value="pl-PL">Polish</MenuItem>
                              <MenuItem value="de-DE">German</MenuItem>
                              <MenuItem value="fi-FI">Finnish</MenuItem>
                            </Select>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel id="snipeenable-select-label">
                          Snipe Permissions
                        </InputLabel>
                        <Controller
                          name="enableSnipeForEveryone"
                          control={control}
                          defaultValue={activeServer.enableSnipeForEveryone}
                          render={({ field }) => (
                            <Select
                              {...field}
                              labelId="snipeenable-select-label"
                              label="Snipe Permissions"
                            >
                              <MenuItem value="true">Everyone</MenuItem>
                              <MenuItem value="false">Admins</MenuItem>
                            </Select>
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button type="submit" color="primary" variant="outlined">
                    Save
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Container>
        )}
      </Container>

      {/* Success snackbar */}
      <Snackbar
        open={serverUpdateSuccess}
        autoHideDuration={5000}
        onClose={() => setUpdateServerSuccess(prev => !prev)}
        ClickAwayListenerProps={{ onClickAway: () => {} }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setUpdateServerSuccess(prev => !prev)}
        >
          Successfully updated settings
        </Alert>
      </Snackbar>

      {/* Failure snackbar */}
      <Snackbar
        open={serverUpdateFailure}
        autoHideDuration={5000}
        onClose={() => setUpdateServerFailure(prev => !prev)}
        ClickAwayListenerProps={{ onClickAway: () => {} }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setUpdateServerSuccess(prev => !prev)}
        >
          Failed to update settings
        </Alert>
      </Snackbar>
    </Layout>
  )
}

export default withAuth(ServerDashboardPage)
