import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  darken,
  makeStyles,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
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
import { ErrorButton } from '../components/buttons'

function SettingsPage() {
  const dispatch = useDispatch()
  const { user, loading, updateUserErrorMsg } = useAppSelector(
    state => state.users,
  )

  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false)
  const [userUpdateFailure, setUserUpdateFailure] = useState(false)

  useEffect(() => {
    if (loading) dispatch(fetchUser())
  }, [])

  const { control, handleSubmit } = useForm()

  const generateWebhook = () => {
    // Let's not try to make API call if we don't have to
    if (user.webhook) return
    dispatch(createUserWebhook())
  }

  const deleteWebhook = () => {
    if (!user.webhook) return
    dispatch(deleteUserWebhook())
  }

  const copyWebhookTokenToClipboard = async () => {
    if (!user.webhook) return
    await navigator.clipboard.writeText(user.webhook?.value)
  }

  const onSubmit = (data: Partial<User>) => {
    dispatch(updateUser(data))
    if (updateUserErrorMsg) setUserUpdateFailure(true)
    else setUserUpdateSuccess(true)
  }
  return (
    <Layout>
      <Container>
        {loading && (
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
              <Box py={2}>Loading your profile...</Box>
            </Typography>
          </Box>
        )}

        <Box mt={3}>
          {!loading && (
            <>
              Your id: {user.id} <br />
              Last update notification: {user.latestUpdateNotifcation} <br />
              {user.isBetaTester ? (
                <>
                  Webhook:{' '}
                  {user.webhook ? (
                    <Box display="flex" gridGap={10}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={copyWebhookTokenToClipboard}
                      >
                        Copy Webhook Token
                      </Button>
                      <ErrorButton
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={deleteWebhook}
                      >
                        Delete Webhook
                      </ErrorButton>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={generateWebhook}
                    >
                      Create Webhook
                    </Button>
                  )}
                </>
              ) : null}
              <br />
              <br />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" style={{ margin: 8 }}>
                  Notifications level
                </Typography>
                <Controller
                  name="notificationsLevel"
                  control={control}
                  defaultValue={user.notificationsLevel}
                  render={({ field }) => (
                    <Select {...field} style={{ margin: 8 }}>
                      <MenuItem value={0}>None</MenuItem>
                      <MenuItem value={1}>Major</MenuItem>
                      <MenuItem value={2}>All</MenuItem>
                    </Select>
                  )}
                />
                <Typography variant="h5" style={{ margin: 8 }}>
                  Steam ID
                </Typography>
                <Controller
                  name="steamId"
                  control={control}
                  defaultValue={user.steamId}
                  render={({ field }) => (
                    <TextField
                      autoComplete="false"
                      helperText="Your SteamID64"
                      {...field}
                      style={{ margin: 8 }}
                    />
                  )}
                />
                <br />
                <Box mt={3}>
                  <Button type="submit" color="primary" variant="outlined">
                    Save
                  </Button>
                </Box>
              </form>
            </>
          )}
        </Box>
      </Container>

      {/* Success snackbar */}
      <Snackbar
        open={userUpdateSuccess}
        autoHideDuration={5000}
        onClose={() => setUserUpdateSuccess(prev => !prev)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success">Successfully updated settings</Alert>
      </Snackbar>

      {/* Failure snackbar */}
      <Snackbar
        open={userUpdateFailure}
        autoHideDuration={5000}
        onClose={() => setUserUpdateFailure(prev => !prev)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="error">Failed to update settings</Alert>
      </Snackbar>
    </Layout>
  )
}

export default withAuth(SettingsPage)
