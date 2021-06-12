import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useLocalStorage from '../../components/hooks/useLocalStorage'

export default function success() {
  const router = useRouter()
  const [_tokenStorage, setTokenStorage] = useLocalStorage('token', '')
  const [_refreshTokenStorage, setRefreshTokenStorage] = useLocalStorage(
    'refresh_token',
    '',
  )

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setTokenStorage(urlParams.get('token'))
    setRefreshTokenStorage(urlParams.get('refreshToken'))

    router.push('/dashboard')
  }, [])

  return <div>Redirecting...</div>
}
