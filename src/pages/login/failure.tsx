import { useEffect, useState } from 'react'

export default function failure() {
  const [errorMessage, setErrorMessage] = useState('Error while authenticating')
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setErrorMessage(urlParams.get('message'))
  }, [])

  return <div>{errorMessage}</div>
}
