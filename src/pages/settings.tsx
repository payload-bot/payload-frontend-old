import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
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
  const { user, loading, updateUserErrorMsg } = useAppSelector(
    state => state.users,
  )

  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false)
  const [userUpdateFailure, setUserUpdateFailure] = useState(false)

  const [modifyingWebhook, setModifyingWebhook] = useState(false)

  useEffect(() => {
    if (loading) dispatch(fetchUser())
  }, [])

  const { control, handleSubmit } = useForm()

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
    dispatch(updateUser(data))
    if (updateUserErrorMsg) setUserUpdateFailure(true)
    else setUserUpdateSuccess(true)
  }

  useEffect(() => {
    if (!modifyingWebhook) return
    setModifyingWebhook(false)
  }, [user?.webhook?.value])

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
            <Typography variant="h5">Webhook: </Typography>
            {user.webhook ? (
              <Stack spacing={1} direction="row">
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
            <br />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} mb={3}>
                <>
                  <Typography variant="h5">Notifications level</Typography>
                  <Controller
                    name="notificationsLevel"
                    control={control}
                    defaultValue={user.notificationsLevel}
                    render={({ field }) => (
                      <Select {...field}>
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>Major</MenuItem>
                        <MenuItem value={2}>All</MenuItem>
                      </Select>
                    )}
                  />
                </>

                <>
                  <Typography variant="h5">Steam ID</Typography>
                  <Controller
                    name="steamId"
                    control={control}
                    defaultValue={user.steamId}
                    render={({ field }) => (
                      <TextField
                        autoComplete="false"
                        helperText="Your SteamID64"
                        {...field}
                      />
                    )}
                  />
                </>
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
