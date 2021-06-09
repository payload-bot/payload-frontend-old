import axios from 'axios'

const client = axios.create({})

client.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (!token) return config

  config.headers.Authorization = token
  return config
})

export default client
