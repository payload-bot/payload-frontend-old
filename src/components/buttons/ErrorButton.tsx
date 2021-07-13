import { Button, ButtonProps, darken, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    backgroundColor: theme.palette.error.dark,
    '&:hover': {
      transition: theme.transitions.duration.shorter,
      backgroundColor: darken(theme.palette.error.dark, 0.5),
    },
  },
}))

export function ErrorButton({ children, ...props }: ButtonProps) {
  const styles = useStyles()
  return (
    <Button {...props} className={styles.deleteButton}>
      {children}
    </Button>
  )
}
