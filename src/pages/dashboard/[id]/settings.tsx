import { useRouter } from 'next/router'
import withAuth from '../../../components/withAuth'
import Layout from '../../../components/layout/Layout'
import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import {
  createServerWebhook,
  deleteServerWebhook,
  fetchServer,
} from '../../../redux/servers/serverSlice'
import { useAppSelector } from '../../../redux/store'
import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ServerAvatar from '../../../components/ServerAvatar'
import { Controller, useForm } from 'react-hook-form'
import DashboardSidebar from '../../../components/DashboardSidebar'
import { ErrorButton } from '../../../components/buttons'

import LoadingButton from '@material-ui/lab/LoadingButton'
import Alert from '../../../components/Alert'

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

  const {
    activeServer,
    activeServerId,
    passedBetaCheck,
    loadingActiveServer,
    loadingActiveServerErrorMsg,
    loadedServerCache,
  } = useAppSelector(state => state.servers)

  const { user } = useAppSelector(state => state.users)

  const [serverUpdateSuccess, setUpdateServerSuccess] = useState(false)
  const [serverUpdateFailure, setUpdateServerFailure] = useState(false)
  const [openWebhookDialog, setOpenWebhookDialog] = useState(false)
  const [webhookChannel, setWebhookChannel] = useState('')
  const [creatingWebhook, setCreatingWebhook] = useState(false)

  const onWebhookDialogClose = () => {
    setWebhookChannel('')
    setCreatingWebhook(false)
    setOpenWebhookDialog(p => !p)
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

  const copyWebhookTokenToClipboard = async () => {
    if (!activeServer.webhook?.value) return
    await navigator.clipboard.writeText(activeServer.webhook.value)
  }

  const generateWebhook = () => {
    // Let's not try to make API call if we don't have to
    if (activeServer.webhook) return
    setCreatingWebhook(true)
    dispatch(createServerWebhook(activeServer.id, webhookChannel))
    onWebhookDialogClose()
  }

  const deleteWebhook = () => {
    if (!activeServer.webhook) return
    dispatch(deleteServerWebhook(activeServer.id))
  }

  return (
    <Layout
      sideBarEnabled={!loadingActiveServer}
      sideBarContent={<DashboardSidebar {...activeServer} />}
    >
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
                {user.isBetaTester && (
                  <>
                    Webhook:{' '}
                    {activeServer.webhook ? (
                      <Box display="flex" gap={2}>
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
                        onClick={() => setOpenWebhookDialog(true)}
                      >
                        Create Webhook
                      </Button>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </Container>
        )}
      </Container>

      <Dialog
        open={openWebhookDialog}
        onClose={onWebhookDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Webhook</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We need a channel to send the previews to. Choose a channel here.
          </DialogContentText>
          <Autocomplete
            style={{ paddingTop: 15 }}
            id="webhook-server-autocomplete"
            options={activeServer?.guild?.channels ?? []}
            onChange={(_, newValue: { id: string; name: string }) => {
              setWebhookChannel(newValue?.id ?? '')
            }}
            getOptionLabel={o => o.name}
            renderInput={params => {
              return (
                <TextField
                  fullWidth
                  label="Channel"
                  variant="outlined"
                  {...params}
                />
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onWebhookDialogClose} color="error">
            Cancel
          </Button>
          <LoadingButton
            onClick={generateWebhook}
            color="primary"
            loading={creatingWebhook}
            disabled={!webhookChannel}
          >
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Success snackbar */}
      <Snackbar
        open={serverUpdateSuccess}
        autoHideDuration={5000}
        onClose={() => setUpdateServerSuccess(prev => !prev)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success">Successfully updated settings</Alert>
      </Snackbar>

      {/* Failure snackbar */}
      <Snackbar
        open={serverUpdateFailure}
        autoHideDuration={5000}
        onClose={() => setUpdateServerFailure(prev => !prev)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="error">Failed to update settings</Alert>
      </Snackbar>
    </Layout>
  )
}

export default withAuth(ServerDashboardPage)
