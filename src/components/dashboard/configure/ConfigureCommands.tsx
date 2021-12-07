import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateServer } from '../../../redux/servers/serverSlice'
import { useAppSelector } from '../../../redux/store'
import CommandToggle from './CommandToggle'

export default function ConfigureCommands() {
  const [commandsToRestrict, setCommandsToRestrict] = useState<string[]>([])

  const dispatch = useDispatch()
  const { activeServer } = useAppSelector(state => state.servers)

  function notifyFunction(cmdName: string, checked: boolean) {
    if (checked) {
      setCommandsToRestrict([...commandsToRestrict, cmdName])
    } else {
      const elementsChecked = commandsToRestrict.filter(cmd => cmd !== cmdName)
      setCommandsToRestrict(elementsChecked)
    }
  }

  useEffect(() => {
    console.log(commandsToRestrict)
  }, [commandsToRestrict])

  useEffect(() => {
    if (activeServer?.commands) {
      setCommandsToRestrict(activeServer?.commands.restrictions)
    }
  }, [activeServer])

  return (
    <Stack gap={2}>
      <section>
        <Typography textAlign="left" variant="h5" my={2}>
          Commands
        </Typography>
        <Card>
          <CardContent>
            <Stack gap={2} divider={<Divider variant="fullWidth" />}>
              {activeServer?.commands.commands
                .filter(cmd => !['restrict', 'unrestrict'].includes(cmd))
                .sort()
                .map(cmd => (
                  <CommandToggle
                    key={cmd}
                    checked={activeServer?.commands.restrictions.includes(cmd)}
                    name={cmd}
                    notifyFunction={notifyFunction}
                  />
                ))}
            </Stack>
          </CardContent>
        </Card>
      </section>
      <section>
        <Typography textAlign="left" variant="h5" my={2}>
          Auto Responses
        </Typography>
        <Card>
          <CardContent>
            <Stack gap={2} divider={<Divider variant="fullWidth" />}>
              {activeServer?.commands.autoResponses.map(cmd => (
                <CommandToggle
                  key={cmd}
                  checked={activeServer?.commands.restrictions.includes(cmd)}
                  name={cmd}
                  notifyFunction={notifyFunction}
                />
              ))}
            </Stack>
          </CardContent>
        </Card>
      </section>
    </Stack>
  )
}
