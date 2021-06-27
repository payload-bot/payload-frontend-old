import { Provider } from 'react-redux'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import jwt_decode from 'jwt-decode'
import store from '../redux/store'
import theme from '../lib/makeTheme'
import useLocalStorage from '../components/hooks/useLocalStorage'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [refreshToken] = useLocalStorage('refresh_token', null)

  useEffect(() => {
    try {
      if (!refreshToken) return;
      const decoded = jwt_decode(refreshToken) as { exp: number }
      if (Date.now() >= decoded.exp * 1000) {
        // the refresh token has expired
        window.localStorage.removeItem('refresh_token')
        window.localStorage.removeItem('token')
      }
    } catch (err) {
      // parsing failed, just remove tokens
      window.localStorage.removeItem('refresh_token')
      window.localStorage.removeItem('token')
    }
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
