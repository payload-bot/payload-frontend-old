import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'

// Create a theme instance.
let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#34495e',
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
