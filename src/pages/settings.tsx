import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ID as SteamID } from '@node-steam/id'
import {
  Avatar,
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
  InputLabel,
  FormControl,
  useMediaQuery,
  Theme,
} from '@material-ui/core'
import Layout from '../components/layout/Layout'
import withAuth from '../components/withAuth'
import { useAppSelector } from '../redux/store'
import {
  createUserWebhook,
  deleteUserWebhook,
  fetchUser,
  updateUser,
} from '../redux/users/userSlice'
import { Controller, useForm } from 'react-hook-form'
import { User } from '../redux/users/types'
import LoadingButton from '@material-ui/lab/LoadingButton'

function SettingsPage() {
  const dispatch = useDispatch()
  const isMobileDevice = useMediaQuery<Theme>(theme =>
    theme.breakpoints.up('sm'),
  )
  const { user, loading, updateUserErrorMsg } = useAppSelector(
    state => state.users,
  )

  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false)
  const [userUpdateFailure, setUserUpdateFailure] = useState(false)

  const [modifyingWebhook, setModifyingWebhook] = useState(false)

  useEffect(() => {
    if (loading) dispatch(fetchUser())
  }, [])

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm()

  const steamIdWatcher = watch('steamId', user.steamId)

  const steamId64Transformed = useMemo(() => {
    if (steamIdWatcher == '0') return null
    try {
      return new SteamID(steamIdWatcher).getSteamID64()
    } catch {
      return null
    }
  }, [steamIdWatcher])

  const generateWebhook = () => {
    // Let's not try to make API call if we don't have to
    if (user.webhook) return
    setModifyingWebhook(true)
    dispatch(createUserWebhook())
  }

  const deleteWebhook = () => {
    if (!user.webhook) return
    setModifyingWebhook(true)
    dispatch(deleteUserWebhook())
  }

  const copyWebhookTokenToClipboard = async () => {
    if (!user.webhook?.value) return
    await navigator.clipboard.writeText(user.webhook.value)
  }

  const onSubmit = (data: Partial<User>) => {
    // Hack to transform any steamid to correct format
    data.steamId = steamIdWatcher === '' ? '' : steamId64Transformed
    dispatch(updateUser(data))
    if (updateUserErrorMsg) setUserUpdateFailure(true)
    else setUserUpdateSuccess(true)
  }

  useEffect(() => {
    if (!modifyingWebhook) return
    setModifyingWebhook(false)
  }, [user?.webhook?.value])

  const steamIdHelperText = () => {
    if (errors.steamId) {
      // If I have a message, use it, default otherwise
      return !!errors.steamId.message
        ? errors.steamId.message
        : "That doesn't appear to be a valid SteamID."
    }

    if (steamIdWatcher !== '' && !!steamId64Transformed) {
      return `SteamID64: ${steamId64Transformed}`
    }

    return 'Your Steam ID, any format'
  }

  return (
    <Layout>
      <Stack spacing={2} alignItems="center" my={3} mb={2}>
        <Avatar src={user.avatar} />
        <Tooltip title={user.id}>
          <Typography variant="h5" style={{ marginTop: 5 }}>
            {user.name}
          </Typography>
        </Tooltip>
      </Stack>
      <Container>
        <Card>
          <CardContent>
            <Stack mb={2} direction="column" alignItems="center">
              Last update: {user.latestUpdateNotifcation} &bull; Pushcart
              points: {user.pushcartPoints}
            </Stack>
            {user.webhook ? (
              <Stack spacing={1} mb={3} direction="row">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={copyWebhookTokenToClipboard}
                >
                  Copy Webhook Token
                </Button>
                <LoadingButton
                  loading={modifyingWebhook}
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={deleteWebhook}
                >
                  Delete Webhook
                </LoadingButton>
              </Stack>
            ) : (
              <LoadingButton
                loading={modifyingWebhook}
                variant="contained"
                color="primary"
                size="small"
                onClick={generateWebhook}
              >
                Create Webhook
              </LoadingButton>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                my={3}
                spacing={2}
                direction={isMobileDevice ? 'row' : 'column'}
              >
                <FormControl sx={{ minWidth: 175 }}>
                  <InputLabel id="notifications-select-label">
                    Notifications Level
                  </InputLabel>
                  <Controller
                    name="notificationsLevel"
                    control={control}
                    defaultValue={user.notificationsLevel}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Notifications Level"
                        labelId="notifications-select-label"
                      >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>Major</MenuItem>
                        <MenuItem value={2}>All</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>

                <Controller
                  name="steamId"
                  control={control}
                  defaultValue={user.steamId}
                  rules={{
                    validate: value => {
                      try {
                        return !!new SteamID(value).getSteamID64()
                      } catch (err) {
                        return false
                      }
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Steam ID"
                      autoComplete="false"
                      error={errors.steamId ? true : false}
                      helperText={steamIdHelperText()}
                      {...field}
                    />
                  )}
                />
              </Stack>
              <Button type="submit" color="primary" variant="outlined">
                Save
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>

      {/* Success snackbar */}
      <Snackbar
        open={userUpdateSuccess}
        autoHideDuration={5000}
        ClickAwayListenerProps={{ onClickAway: () => {} }}
        onClose={() => setUserUpdateSuccess(prev => !prev)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled">
          Successfully updated settings
        </Alert>
      </Snackbar>

      {/* Failure snackbar */}
      <Snackbar
        open={userUpdateFailure}
        autoHideDuration={5000}
        ClickAwayListenerProps={{ onClickAway: () => {} }}
        onClose={() => setUserUpdateFailure(prev => !prev)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="error" variant="filled">
          Failed to update settings
        </Alert>
      </Snackbar>
    </Layout>
  )
}

export default withAuth(SettingsPage)
