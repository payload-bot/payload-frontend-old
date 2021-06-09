import axios from 'axios'

const client = axios.create({})

client.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  
  if (!token) return config

  // Need to parse for JWT to work, otherwise it breaks
  config.headers['Authorization'] = JSON.parse(token)
  return config
})

export default client
