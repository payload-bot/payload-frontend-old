import React, { useEffect, useState } from 'react'
import { Container, Box, Typography } from '@material-ui/core'
import Layout from '../../components/layout/Layout'

export default function failure() {
  const [errorMessage, setErrorMessage] = useState('Error while authenticating')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setErrorMessage(urlParams.get('message'))
  }, [])

  return (
    <Layout>
      <Container>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h4">{errorMessage}</Typography>
        </Box>
      </Container>
    </Layout>
  )
}
