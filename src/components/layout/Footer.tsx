import Image from 'next/image'
import { Container, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  spacingTop: {
    paddingTop: theme.spacing(2),
  },
  footer: {
    flexGrow: 1,
    backgroundColor: '#23272a',
  },
}))

export default function Footer() {
  const styles = useStyles()

  return (
    <Container maxWidth="xl" className={styles.footer}>
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
    </Container>
  )
}
