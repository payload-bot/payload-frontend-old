import Layout from '../components/Layout'
import { Container, Row, Col, Button } from 'reactstrap'
import Link from 'next/link'
import { CommandResponse } from '../interfaces/command'
import Command from '../components/Command'
import AutoCommand from '../components/AutoCommand'

type DocsProps = {
  commands: CommandResponse
}

const Docs = ({ commands }: DocsProps) => {
  return (
    <Layout>
      <Container className="mt-4">
        <Link href="/">
          <Button type="button">Back to Home</Button>
        </Link>

        <h1 className="m-4">Commands</h1>
        <div className="flex flex-container">
          {commands.commands.data.map(cmd => (
            <Command command={cmd} key={cmd.name} />
          ))}
        </div>

        <h1 className="m-4">Auto Responses</h1>
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
  const res = await fetch(`https://payload.tf/api/internal/public/commands`)
  const commands = await res.json()

  return {
    props: {
      commands,
    },
  }
}

export default Docs
