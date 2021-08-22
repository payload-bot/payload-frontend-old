import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useLocalStorage from '../../components/hooks/useLocalStorage'

export default function Success() {
  const router = useRouter()
  const [_token, setToken] = useLocalStorage('token', '')
  const [_refresh, setRefreshToken] = useLocalStorage('refresh_token', '')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    setToken(urlParams.get('token'))
    setRefreshToken(urlParams.get('refreshToken'))

    router.push('/dashboard')
  }, [])

  return <div>Redirecting...</div>
}
