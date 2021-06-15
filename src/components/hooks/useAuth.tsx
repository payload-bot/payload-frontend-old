import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'
import useUser from './useUser'

export default function useAuth(admin?: boolean) {
  const router = useRouter()
  const [token] = useLocalStorage('token', null)
  const { loading, loggedIn, user, isAdmin } = useUser()

  useEffect(() => {
    if (!token) router.push('/')
    if (loading) return
    if (user === null) router.push('/')
    if (admin && !isAdmin) router.push('/')
  }, [loading, user, admin, isAdmin, token])

  return [loggedIn]
}
