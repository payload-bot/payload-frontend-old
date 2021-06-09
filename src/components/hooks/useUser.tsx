import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/store'
import { fetchUser } from '../../redux/users/userSlice'

export default function useUser() {
  const dispatch = useDispatch()

  const { user, loggedIn, loading, guilds, isAdmin } = useAppSelector(
    state => state.users,
  )

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  return { user, loggedIn, loading, guilds, isAdmin }
}
