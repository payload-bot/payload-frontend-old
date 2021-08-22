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
import { lightGreen } from '@material-ui/core/colors'

const SuccessTooltip = styled<typeof Tooltip>(({ className, ...props }) => (
  <Tooltip arrow {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: lightGreen[800],
    boxShadow: theme.shadows[1],
  },
  [`& .${tooltipClasses.tooltipArrow}`]: {
    backgroundColor: lightGreen[800],
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
                      success={copiedWebhookToken}
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
            {/* <LoadingButton
              loading={modifyingWebhook}
              variant="contained"
              color="error"
              size="small"
              onClick={deleteWebhook}
            >
              Delete Webhook
            </LoadingButton> */}
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}

function CopyTooltip(props: TooltipProps & { success: boolean }) {
  return props.success ? (
    <SuccessTooltip {...props}>{props.children}</SuccessTooltip>
  ) : (
    <Tooltip {...props}>{props.children}</Tooltip>
  )
}
