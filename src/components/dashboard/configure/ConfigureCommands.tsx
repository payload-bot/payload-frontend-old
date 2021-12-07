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
import { useAppSelector } from '../../../redux/store'
import CommandToggle from './CommandToggle'

export default function ConfigureCommands() {
  const dispatch = useDispatch()
  const { activeServer } = useAppSelector(state => state.servers)

  function notifyFunction() {
    console.log('I get called when someone tries to toggle a switch')
  }

  return (
    <>
      <Typography textAlign="left" variant="h5" my={2}>
        Commands
      </Typography>
      <Card>
        <CardContent>
          <Stack gap={2} divider={<Divider variant="fullWidth" />}>
            {activeServer?.commands.commands.map(cmd => (
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
    </>
  )
}
