import Image from 'next/image'
import Link from 'next/link'
import Particles from "react-tsparticles";
import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import Layout from '../components/layout/Layout'
import particleJson from '../particles.json'

const useStyles = makeStyles(theme => ({
  payloadName: {
    fontWeight: 'bold',
  },
  faqContainer: {
    '& > *': {
      maxWidth: '65vw',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '85vw',
    },
  },
  faq: {
    marginBottom: theme.spacing(1),
  },
  break: {
    height: 3,
    backgroundColor: '#23272A',
  },
  button: {
    marginTop: theme.spacing(2),
  },
  offset: {
    marginTop: `-${theme.mixins.toolbar.minHeight}px`,
  },
}))

function Index() {
  const styles = useStyles()

  return (
    <Layout>
      <div className={`night ${styles.offset}`}>
        <div className="main-panel">
          <Particles className="stars" params={particleJson as any} />

          <div className="main-panel-floor">
            <div className="sand"></div>
          </div>

          <img id="pl-logo" src="/img/logo.svg" alt="Payload Logo" />

          <div className="header">
            <Typography variant="h1" className={styles.payloadName}>
              Payload
            </Typography>
            <div className="header-subrow">
              <a className="link no-underline" href="/invite" target="_blank">
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  className={styles.button}
                >
                  Invite to Discord
                </Button>
              </a>
              <Link href="/docs">
                <Button
                  size="large"
                  variant="outlined"
                  color="primary"
                  className={styles.button}
                >
                  Bot Documentation
                </Button>
              </Link>
              <a className="link no-underline" href="/discord" target="_blank">
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  className={styles.button}
                >
                  Official Payload Discord
                </Button>
              </a>
            </div>
          </div>
        </div>

        <Typography variant="h3" align="center">
          <Box py={2}>Supported Services</Box>
        </Typography>

        <Box
          display="flex"
          gridGap={15}
          justifyContent="center"
          alignItems="center"
          py={5}
        >
          <a href="https://etf2l.org">
            <Image
              src="/img/etf2l.png"
              alt="ETF2L league logo"
              width={150}
              height={70}
            />
          </a>
          <a href="https://rgl.gg">
            <Image
              src="/img/rgl.png"
              alt="RGL league logo"
              width={150}
              height={50}
            />
          </a>
          <a href="https://www.ugcleague.com">
            <Image
              src="/img/ugc.png"
              alt="UGC league logo"
              width={150}
              height={70}
            />
          </a>
          <a href="https://logs.tf">
            <Image
              src="/img/logstf.png"
              alt="logs.tf service logo"
              width={150}
              height={50}
            />
          </a>
        </Box>

        {/* FAQ */}
        <div className={styles.break}></div>

        <div>
          <Typography variant="h3" align="center">
            <Box py={2}>FAQ</Box>
          </Typography>
          <Box
            display="flex"
            gridGap={25}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            className={styles.faqContainer}
            mb={5}
          >
            <span>
              <Typography variant="h4" align="center" className={styles.faq}>
                How do I invite this bot to my discord?
              </Typography>
              <Typography variant="body1" align="center">
                You may{' '}
                <a className="link" href="/invite" target="_blank">
                  invite the bot here
                </a>
                , and while logged into the browser, select a server and it will
                be all set up!
              </Typography>
            </span>
            <span>
              <Typography variant="h4" align="center" className={styles.faq}>
                Why is the bot not responding to any commands?
              </Typography>
              <Typography variant="body1" align="center">
                Make sure you didn't accidently set a different prefix.
                Otherwise, our default prefix is "pls ". When setting prefixes,
                make sure you include spaces in quotation marks.
              </Typography>
            </span>
            <span>
              <Typography variant="h4" align="center" className={styles.faq}>
                How do auto commands work?
              </Typography>
              <Typography variant="body1" align="center">
                As said in its name, they work- automatically! Post a link and
                Payload will magically run the command!
              </Typography>
            </span>
            <span>
              <Typography variant="h4" align="center" className={styles.faq}>
                Do you have an offical discord?
              </Typography>
              <Typography variant="body1" align="center">
                Of course! Join us at{' '}
                <a className="link" href="/discord" target="_blank">
                  our discord
                </a>
                !
              </Typography>
            </span>
            <span>
              <Typography variant="h4" align="center" className={styles.faq}>
                Payload is offline! What do I do?
              </Typography>
              <Typography variant="body1" align="center">
                That's not good! We strive to make sure it's on 100% of the
                time. Being offline could mean that work is being done on the
                server, the server died, or an update is being pushed. If it's
                not online within ~10 minutes of being down, contact us on
                discord!
              </Typography>
            </span>
            <span>
              <Typography variant="h4" align="center" className={styles.faq}>
                How do I view all of Payloads' commands?
              </Typography>
              <Typography variant="body1" align="center">
                You may{' '}
                <Link href="/docs">
                  <span className="link">view all commands</span>
                </Link>{' '}
                or use "pls commands" in any channel.
              </Typography>
            </span>
          </Box>
        </div>
      </div>
    </Layout>
  )
}

export default Index
