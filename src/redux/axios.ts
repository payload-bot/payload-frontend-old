import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

// Need to parse for JWT to work, otherwise it breaks
const getAccessToken = () => localStorage.getItem('token')
const getRefreshToken = () => localStorage.getItem('refresh_token')

const client = axios.create({})

client.interceptors.request.use(config => {
  const token = getAccessToken()

  if (!token) return config

  config.headers['Authorization'] = `Bearer ${token.replace(/"/g, '')}`
  return config
})

let refreshingPromiseObject = null

const refreshAuthLogic = async failedRequest => {
  if (refreshingPromiseObject) return refreshingPromiseObject
  return axios
    .post(
      '/api/auth/refresh',
      {},
      { params: { refresh_token: getRefreshToken().replace(/"/g, '') } },
    )
    .then(({ data }) => {
      localStorage.setItem('token', data.authToken)
      localStorage.setItem('refresh_token', data.refreshToken)

      failedRequest.response.config.headers[
        'Authorization'
      ] = `Bearer ${data.authToken}`

      return Promise.resolve()
    })
    .catch(() => Promise.reject())
    .finally(() => (refreshingPromiseObject = null))
}

createAuthRefreshInterceptor(client, refreshAuthLogic, {
  pauseInstanceWhileRefreshing: true,
})

export default client
