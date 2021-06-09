import Link from 'next/link'
import { Container, Button, Typography } from '@material-ui/core'
import Layout from '../components/layout/Layout'
import { CommandResponse } from '../interfaces/command'
import Command from '../components/Command'
import AutoCommand from '../components/AutoCommand'

type DocsProps = {
  commands: CommandResponse
}

function Docs({ commands }: DocsProps) {
  return (
    <Layout>
      <Container>
        <Link href="/">
          <Button variant="contained" color="primary">
            Back to Home
          </Button>
        </Link>

        <Typography variant="h2">Commands</Typography>
        <div className="flex flex-container">
          {commands.commands.data.map(cmd => (
            <Command command={cmd} key={cmd.name} />
          ))}
        </div>

        <Typography variant="h2">Auto Responses</Typography>
        <div className="flex flex-container">
          {commands.autoResponses.data.map(cmd => (
            <AutoCommand command={cmd} key={cmd.name} />
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps(ctx) {
  const res = await fetch(`https://api.payload.tf/api/internal/public/commands`)
  const commands = await res.json()

  return {
    props: {
      commands,
    },
  }
}

export default Docs
