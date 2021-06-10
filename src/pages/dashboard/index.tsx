import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../components/layout/Layout'
import withAuth from '../../components/withAuth'
import { fetchAllServers } from '../../redux/servers/serverSlice'
import { useAppSelector } from '../../redux/store'

function DashboardPage() {
  const dispatch = useDispatch()
  const servers = useAppSelector(state => state.servers)

  useEffect(() => {
    dispatch(fetchAllServers())
  }, [])

  return (
  <Layout>

  </Layout>)
}

export default withAuth(DashboardPage)
