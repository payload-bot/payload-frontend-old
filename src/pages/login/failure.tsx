import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Container, Box, Typography, Button } from '@material-ui/core'
import Layout from '../../components/layout/Layout'

export default function failure() {
  const [errorMessage, setErrorMessage] = useState('Error while authenticating')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setErrorMessage(urlParams.get('message'))
  }, [])

  return (
    <Layout title={`Login Failed | ${errorMessage}`}>
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" mb={10}>
          <Typography variant="h4">{errorMessage}</Typography>
          <Link href="/">
            <Button variant="outlined" color="primary">
              Take me back
            </Button>
          </Link>
        </Box>
      </Container>
    </Layout>
  )
}
