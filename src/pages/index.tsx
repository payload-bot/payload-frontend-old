import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Particles from 'react-tsparticles'
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Theme,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Layout from '../components/layout/Layout'

import particleJson from '../particles.json'
import faqQuestions from '../faq.json'

interface FAQQuestion {
  title: string
  description: string
}

const useStyles = makeStyles((theme: Theme) => ({
  payloadName: {
    fontWeight: 'bold',
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

        <Box py={2}>
          <Typography variant="h3" align="center">
            Supported Services
          </Typography>
        </Box>

        <Stack gap={5} direction="row" justifyContent="center" py={5}>
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
        </Stack>

        <Divider variant="middle" />
        <Box py={2}>
          <Typography variant="h3" align="center">
            FAQ
          </Typography>
        </Box>

        <Stack gap={2} justifyContent="center" alignItems="center">
          {faqQuestions.map((q: FAQQuestion) => (
            <Container maxWidth="md">
              <Stack justifyContent="center" alignItems="center" gap={0.5}>
                <Typography textAlign="center" variant="h5">
                  {q.title}
                </Typography>
                <Typography
                  paragraph
                  textAlign="center"
                  dangerouslySetInnerHTML={{ __html: q.description }}
                />
              </Stack>
            </Container>
          ))}
        </Stack>
      </div>
    </Layout>
  )
}

export default Index
