import { Stack, Switch, Box, Divider } from '@material-ui/core'
import React, { useState } from 'react'

type CommandToggleProps = {
  name: string
  checked: boolean
  notifyFunction: Function
}

export default function CommandToggle({
  name,
  checked,
  notifyFunction,
}: CommandToggleProps) {
  const [isChecked, setIsChecked] = useState(!checked)

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.checked)
    notifyFunction()
  }

  return (
    <>
      <Stack direction="row" alignItems="center" alignContent="center">
        <Box flexGrow={1}>{name}</Box>
        <Switch checked={isChecked} onChange={changeHandler} />
      </Stack>
    </>
  )
}
