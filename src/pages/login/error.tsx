import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Container, Stack, Typography, Button } from '@material-ui/core'
import Layout from '../../components/layout/Layout'

export default function Error() {
  const [errorMessage, setErrorMessage] = useState('Error while authenticating')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const message = urlParams.get('message')
    console.log(message)
    if (!message) return
    setErrorMessage(message)
  }, [])

  console.log(errorMessage)

  return (
    <Layout title={`Login Failed | ${errorMessage}`}>
      <Container>
        <Stack justifyContent="center" alignItems="center" spacing={1} mt={5}>
          <Typography variant="h4">{errorMessage}</Typography>
          <Typography variant="body1">
            Failed while logging in. You can try again or go back to the main
            page below.
          </Typography>
          <Stack direction="row" spacing={2} pt={2}>
            <Link href="/login">
              <Button variant="contained" color="primary">
                Try Again
              </Button>
            </Link>
            <Link href="/">
              <Button variant="contained" color="secondary">
                Take me back
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Layout>
  )
}
