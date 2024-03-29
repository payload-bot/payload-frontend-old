import axios, { AxiosRequestConfig } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

// Outside of function because this should
// be recomputed on each call
const getAccessToken = () => localStorage.getItem('token')
const getRefreshToken = () => localStorage.getItem('refresh_token')

const client = axios.create({})

client.interceptors.request.use((req: AxiosRequestConfig) => {
  const token = getAccessToken()
  if (!token) return req

  req.headers['Authorization'] = `Bearer ${token.replace(/"/g, '')}`
  return req
})

const refreshAuthLogic = async failedRequest => {
  return axios
    .post<{ authToken: string; refreshToken: string }>('/api/auth/refresh', {
      refreshToken: getRefreshToken().replace(/"/g, ''),
    })
    .then(({ data }) => {
      localStorage.setItem('token', data.authToken)
      localStorage.setItem('refresh_token', data.refreshToken)

      failedRequest.response.config.headers[
        'Authorization'
      ] = `Bearer ${data.authToken}`

      return Promise.resolve()
    })
    .catch(() => Promise.reject())
}

createAuthRefreshInterceptor(client, refreshAuthLogic, {
  pauseInstanceWhileRefreshing: true,
})

export default client
