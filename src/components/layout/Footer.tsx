import Image from 'next/image'
import { Box, Theme, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  spacingTop: {
    paddingTop: theme.spacing(2),
  },
  footer: {
    flexShrink: 1,
  },
}))

export default function Footer() {
  const styles = useStyles()

  return (
    <Box className={styles.footer} mt={5}>
      <Paper>
        <Typography
          variant="subtitle1"
          align="center"
          className={styles.spacingTop}
        >
          Based on{' '}
          <a className="link no-underline" href="https://sharky.cool">
            sharky's
          </a>{' '}
          bot, now developed by{' '}
          <a
            className="link no-underline"
            href="https://steamcommunity.com/id/chab133"
          >
            24
          </a>
          . Proudly{' '}
          <a className="link" href="https://github.com/payload-bot">
            Open-Sourced
          </a>
          <br />
          <a href="https://vercel.com/?utm_source=payload&utm_compaign=oss">
            <Image
              src="/img/vercel-logo.svg"
              alt="Powered by Vercel Logo"
              width={175}
              height={75}
            />
          </a>
        </Typography>
      </Paper>
    </Box>
  )
}
