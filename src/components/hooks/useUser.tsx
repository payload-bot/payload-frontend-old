import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/store'
import { fetchUser, logoutUser, setLoadingUser } from '../../redux/users/userSlice'
import useLocalStorage from './useLocalStorage'

export default function useUser() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [token] = useLocalStorage('token', null)

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
    if (loading && token) dispatch(fetchUser())
    if (loading && !token) dispatch(setLoadingUser())
  }, [])

  return { user, loggedIn, loading, isAdmin, logout }
}
