import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUser from './useUser'

export default function useAuth(admin?: boolean) {
  const router = useRouter()
  const { loading, loggedIn, user, isAdmin } = useUser()

  useEffect(() => {
    if (loading) return
    if (!loggedIn) return

    if (admin && !isAdmin) router.replace('/');

    if (!loading && !user) router.replace('/login')
  }, [loading, loggedIn, user, isAdmin])

  return [user]
}
