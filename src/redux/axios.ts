import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

// Need to parse for JWT to work, otherwise it breaks
const getAccessToken = () => JSON.parse(localStorage.getItem('token'))
const getRefreshToken = () => JSON.parse(localStorage.getItem('refresh_token'))

const client = axios.create({})

client.interceptors.request.use(config => {
  const token = getAccessToken()

  if (!token) return config

  config.headers['Authorization'] = token
  return config
})

const refreshAuthLogic = async failedRequest => {
  const { data } = await axios.post(
    '/api/auth/refresh',
    {},
    {
      params: {
        refresh_token: getRefreshToken(),
      },
    },
  )

  localStorage.setItem('token', JSON.stringify(data.authToken))
  localStorage.setItem('refresh_token', JSON.stringify(data.refreshToken))

  failedRequest.response.config.headers['Authorization'] = JSON.parse(
    data.authToken,
  )

  return Promise.resolve()
}

createAuthRefreshInterceptor(client, refreshAuthLogic)

export default client
