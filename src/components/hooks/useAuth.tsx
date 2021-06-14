import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUser from './useUser'

export default function useAuth(admin?: boolean) {
  const router = useRouter()
  const { loading, loggedIn, user, isAdmin } = useUser()

  useEffect(() => {
    if (loading) return
    if (admin && !isAdmin) router.push('/')

    if (!loading && user === null) router.push('/')
  }, [loading, user, admin, isAdmin])

  return [loggedIn]
}
