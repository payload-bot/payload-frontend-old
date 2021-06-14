import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/store'
import { fetchUser, logoutUser } from '../../redux/users/userSlice'

export default function useUser() {
  const router = useRouter()
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    dispatch(logoutUser())
    router.push('/')
  }

  const { user, loggedIn, loading, isAdmin } = useAppSelector(
    state => state.users,
  )

  useEffect(() => {
    if (loading) dispatch(fetchUser())
  }, [])

  return { user, loggedIn, loading, isAdmin, logout }
}
