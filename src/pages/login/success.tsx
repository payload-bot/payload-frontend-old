import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useLocalStorage from '../../components/hooks/useLocalStorage'

export default function success() {
  const router = useRouter()
  const [_tokenStorage, setTokenStorage] = useLocalStorage('token', '')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setTokenStorage(urlParams.get('token'))

    router.push('/')
  }, [])

  return <div>Successfully logged in!</div>
}
