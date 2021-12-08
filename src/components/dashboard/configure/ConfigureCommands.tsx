import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@material-ui/core'
import React from 'react'
import CommandToggle from './CommandToggle'

type ConfigureCommandProps = {
  commands: string[]
  autoResponses: string[]
  restrictions: string[]
  notifyFunction: (cmdName: string, checked: boolean) => any
}

export default function ConfigureCommands({
  commands,
  autoResponses,
  restrictions,
  notifyFunction,
}: ConfigureCommandProps) {
  return (
    <Stack gap={2}>
      <section>
        <Typography textAlign="left" variant="h5" my={2}>
          Commands
        </Typography>
        <Card>
          <CardContent>
            <Stack gap={2} divider={<Divider variant="fullWidth" />}>
              {commands
                .filter(cmd => !['restrict', 'unrestrict'].includes(cmd))
                .sort()
                .map(cmd => (
                  <CommandToggle
                    key={cmd}
                    checked={restrictions.includes(cmd)}
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
              {autoResponses.map(cmd => (
                <CommandToggle
                  key={cmd}
                  checked={restrictions.includes(cmd)}
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
