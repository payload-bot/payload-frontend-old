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
  Stack,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ServerAvatar from '../../../components/ServerAvatar'
import DashboardSidebar from '../../../components/DashboardSidebar'

import LoadingButton from '@material-ui/lab/LoadingButton'

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
    loadingActiveServer,
    loadingActiveServerErrorMsg,
    loadedServerCache,
  } = useAppSelector(state => state.servers)

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
    if (!openWebhookDialog || !creatingWebhook) return
    onWebhookDialogClose()
  }, [activeServer?.webhook?.value])

  useEffect(() => {
    if (!loadedServerCache[id as string]) {
      dispatch(fetchServer(id as string))
    }
  }, [activeServerId])

  const copyWebhookTokenToClipboard = async () => {
    if (!activeServer.webhook?.value) return
    await navigator.clipboard.writeText(activeServer.webhook.value)
  }

  const generateWebhook = async () => {
    // Let's not try to make API call if we don't have to
    if (activeServer.webhook) return
    setCreatingWebhook(true)
    dispatch(createServerWebhook(activeServer.id, webhookChannel))
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

        {!loadingActiveServer && loadingActiveServerErrorMsg && (
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

        {!loadingActiveServer && activeServer && (
          <Container>
            <Stack alignItems="center" py={2}>
              <ServerAvatar icon={activeServer.icon} name={activeServer.name} />
              <Typography variant="h6">{activeServer.name}</Typography>
            </Stack>
            <Card className={styles.card}>
              <CardContent>
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
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={deleteWebhook}
                    >
                      Delete Webhook
                    </Button>
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
    </Layout>
  )
}

export default withAuth(ServerDashboardPage)
