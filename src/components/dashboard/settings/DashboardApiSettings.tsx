import React, { useEffect, useState } from 'react'
import { styled } from '@material-ui/core/styles'
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Tooltip,
  TooltipProps,
  Typography,
} from '@material-ui/core'
import { tooltipClasses } from '@material-ui/core/Tooltip'
import { LoadingButton } from '@material-ui/lab'
import { useDispatch } from 'react-redux'
import ContentCopyIcon from '@material-ui/icons/ContentCopy'
import { green } from '@material-ui/core/colors'
import axios from 'axios'
import {
  createServerWebhook,
  deleteServerWebhook,
} from '../../../redux/servers/serverSlice'
import { useAppSelector } from '../../../redux/store'

async function testUserWebhook(token: string) {
  try {
    await axios.post(
      '/api/webhooks/v1/internal/test',
      {},
      {
        headers: {
          Authorization: token,
        },
      },
    )
  } catch (err) {
    // ignore
  }
}

const SuccessTooltip = styled<typeof Tooltip>(({ className, ...props }) => (
  <Tooltip arrow {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: green[500],
    boxShadow: theme.shadows[1],
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: green[500],
  },
}))

export default function DashboardApiSettings() {
  const dispatch = useDispatch()

  const [modifyingWebhook, setModifyingWebhook] = useState(false)
  const [copiedWebhookToken, setCopiedWebhookToken] = useState(false)
  const { activeServer } = useAppSelector(state => state.servers)

  const [openWebhookDialog, setOpenWebhookDialog] = useState(false)
  const [webhookChannel, setWebhookChannel] = useState('')
  const [creatingWebhook, setCreatingWebhook] = useState(false)

  const onWebhookDialogClose = () => {
    setWebhookChannel('')
    setCreatingWebhook(false)
    setOpenWebhookDialog(p => !p)
  }

  useEffect(() => {
    if (!openWebhookDialog || !creatingWebhook) return
    onWebhookDialogClose()
  }, [activeServer?.webhook?.value])

  useEffect(() => {
    if (!copiedWebhookToken) return
    const timer = setTimeout(() => {
      setCopiedWebhookToken(prev => !prev)
    }, 1500)

    return () => clearTimeout(timer)
  }, [copiedWebhookToken])

  useEffect(() => {
    if (!modifyingWebhook) return
    setModifyingWebhook(false)
  }, [activeServer?.webhook])

  const testWebhook = async () => {
    setModifyingWebhook(true)
    await testUserWebhook(activeServer.webhook.value)
    setModifyingWebhook(false)
  }

  const copyWebhookTokenToClipboard = async () => {
    if (!activeServer.webhook?.value) return
    await navigator.clipboard.writeText(activeServer.webhook.value)
    setCopiedWebhookToken(true)
  }

  const generateWebhook = async () => {
    // Let's not try to make API call if we don't have to
    if (activeServer.webhook) return
    setCreatingWebhook(true)
    dispatch(createServerWebhook(activeServer.id, webhookChannel))
  }

  const deleteWebhook = () => {
    setModifyingWebhook(true)
    if (!activeServer.webhook) return
    dispatch(deleteServerWebhook(activeServer.id))
  }

  return (
    <>
      <Card>
        <CardContent>
          <Stack pb={2}>
            <Typography textAlign="center" variant="h5">
              API Settings
            </Typography>
          </Stack>

          {!activeServer?.webhook && (
            <Stack alignItems="center" justifyContent="center" spacing={1}>
              <Typography>
                Looks like you don't have an API key set up. Set one up using
                the button below!
              </Typography>
              <LoadingButton
                loading={modifyingWebhook}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => setOpenWebhookDialog(true)}
              >
                Create API key
              </LoadingButton>
            </Stack>
          )}

          {activeServer?.webhook && (
            <Stack spacing={1} mb={3}>
              <FormControl sx={{ maxWidth: '50ch' }} variant="outlined">
                <InputLabel htmlFor="webhook-value-textfield">
                  API Key
                </InputLabel>
                <OutlinedInput
                  readOnly
                  id="webhook-value-textfield"
                  value={activeServer?.webhook.value}
                  endAdornment={
                    <InputAdornment position="end">
                      <CopyTooltip
                        didCopy={copiedWebhookToken}
                        arrow
                        placement="top"
                        title={
                          copiedWebhookToken ? 'Copied!' : 'Copy to Clipboard'
                        }
                      >
                        <IconButton
                          aria-label="copy api token to clipboard"
                          onClick={copyWebhookTokenToClipboard}
                          onMouseDown={copyWebhookTokenToClipboard}
                          edge="end"
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      </CopyTooltip>
                    </InputAdornment>
                  }
                  label="API Token"
                />
              </FormControl>
              <Stack direction="row" spacing={2} justifyContent="start" pt={1}>
                <LoadingButton
                  loading={modifyingWebhook}
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={testWebhook}
                >
                  Test API key
                </LoadingButton>

                {/* @TODO: Probably using react query with this + some state */}
                {/* <LoadingButton
                loading={modifyingWebhook}
                variant="contained"
                color="secondary"
                size="small"
                onClick={regenerateWebhook}
              >
                Regenerate API key
              </LoadingButton> */}

                <LoadingButton
                  loading={modifyingWebhook}
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={deleteWebhook}
                >
                  Delete API key
                </LoadingButton>
              </Stack>
            </Stack>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={openWebhookDialog}
        onClose={onWebhookDialogClose}
        aria-labelledby="apikey-form-create"
      >
        <DialogTitle id="apikey-form-create">Create API Key</DialogTitle>
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
    </>
  )
}

function CopyTooltip({
  didCopy,
  ...props
}: TooltipProps & { didCopy: boolean }) {
  return didCopy ? (
    <SuccessTooltip {...props}>{props.children}</SuccessTooltip>
  ) : (
    <Tooltip {...props}>{props.children}</Tooltip>
  )
}
