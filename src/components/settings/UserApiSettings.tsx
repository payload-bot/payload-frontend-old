import React, { useEffect, useState } from 'react'
import { styled } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
} from '@material-ui/core'
import { tooltipClasses } from '@material-ui/core/Tooltip'
import { LoadingButton } from '@material-ui/lab'
import { useDispatch } from 'react-redux'
import {
  createUserWebhook,
  deleteUserWebhook,
} from '../../redux/users/userSlice'
import useUser from '../hooks/useUser'
import ContentCopyIcon from '@material-ui/icons/ContentCopy'
import { green } from '@material-ui/core/colors'
import axios from 'axios'

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

export default function UserApiSettings() {
  const dispatch = useDispatch()
  const { user } = useUser()

  const [modifyingWebhook, setModifyingWebhook] = useState(false)
  const [copiedWebhookToken, setCopiedWebhookToken] = useState(false)

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
  }, [user?.webhook?.value])

  const generateWebhook = () => {
    setModifyingWebhook(true)
    dispatch(createUserWebhook())
  }

  const deleteWebhook = () => {
    setModifyingWebhook(true)
    dispatch(deleteUserWebhook())
  }

  const testWebhook = async () => {
    setModifyingWebhook(true)
    await testUserWebhook(user.webhook.value)
    setModifyingWebhook(false)
  }

  const copyWebhookTokenToClipboard = async () => {
    if (!user.webhook?.value) return
    await navigator.clipboard.writeText(user.webhook.value)
    setCopiedWebhookToken(true)
  }

  return (
    <Card>
      <CardContent>
        <Stack pb={2}>
          <Typography textAlign="center" variant="h5">
            API Settings
          </Typography>
        </Stack>

        {!user.webhook && (
          <Stack alignItems="center" justifyContent="center" spacing={1}>
            <Typography>
              Looks like you don't have an API key set up. Set one up using the
              button below!
            </Typography>
            <LoadingButton
              loading={modifyingWebhook}
              variant="contained"
              color="primary"
              size="small"
              onClick={generateWebhook}
            >
              Create API key
            </LoadingButton>
          </Stack>
        )}

        {user.webhook && (
          <Stack spacing={1} mb={3}>
            <FormControl sx={{ maxWidth: '50ch' }} variant="outlined">
              <InputLabel htmlFor="webhook-value-textfield">API Key</InputLabel>
              <OutlinedInput
                readOnly
                id="webhook-value-textfield"
                value={user.webhook.value}
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
