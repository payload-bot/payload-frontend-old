import Image from 'next/image'
import Link from 'next/link'
import Particles from 'react-particles-js'
import Layout from '../components/layout/Layout'
import particleJson from '../particles.json'

const Index = () => {
  return (
    <Layout>
      <div className="main-panel">
        <Particles className="stars" params={particleJson as any} />
        <div className="main-panel-floor">
          <div className="sand"></div>
        </div>
        <img id="pl-logo" src="/img/logo.svg" alt="Payload Logo" />
        <div className="header">
          <h1>Payload</h1>
          <div className="header-subrow">
            <a
              className="link no-underline"
              href="https://discordapp.com/oauth2/authorize?client_id=644333502870978564&permissions=388161&scope=bot"
              target="_blank"
            >
              <button type="button" className="btn btn-discord btn-lg mr-3">
                Invite to Discord
              </button>
            </a>
            <Link href="/docs">
              <button type="button" className="btn btn-outline-light btn-lg">
                Bot Documentation
              </button>
            </Link>
            <a
              className="link no-underline"
              href="https://discord.com/invite/gYnnMYz"
              target="_blank"
            >
              <button type="button" className="btn btn-discord btn-lg mr-3">
                Official Payload Discord
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className="container-fluid p-5">
        <div className="text-center mb-5">
          <h3>Supported Services</h3>
        </div>
        <div className="league-list">
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
        </div>
      </div>

      <div className="break"></div>
      <div className="container-fluid p-5">
        <div className="text-center">
          <h2 className="mb-5">FAQ</h2>
          <div className="faq">
            <div>How do I invite this bot to my discord?</div>
            <div>
              You may{' '}
              <a
                className="link"
                href="https://discordapp.com/oauth2/authorize?client_id=644333502870978564&permissions=388161&scope=bot"
              >
                invite the bot here
              </a>
              , and while logged into the browser, select a server and it will
              be all set up!
            </div>

            <div>Why is the bot not responding to any commands?</div>
            <div>
              Make sure you didn't accidently set a different prefix. Otherwise,
              our default prefix is "pls ". When setting prefixes, make sure you
              include spaces in quotation marks.
            </div>

            <div>How do auto commands work?</div>
            <div>
              As said in its name, they work- automatically! Post a link and
              Payload will magically run the command!
            </div>

            <div>Do you have an offical discord?</div>
            <div>
              Of course! Join us at{' '}
              <a className="link" href="https://discord.com/invite/gYnnMYz">
                our discord
              </a>
              !
            </div>

            <div>Payload is offline! What do I do?</div>
            <div>
              That's not good! We strive to make sure it's on 100% of the time.
              Being offline could mean that work is being done on the server,
              the server died, or an update is being pushed. If it's not online
              within ~10 minutes of being down, contact us on discord!
            </div>

            <div>How do I view all of Payloads' commands?</div>
            <div>
              You may{' '}
              <Link href="/docs">
                <span className="link">view all commands</span>
              </Link>{' '}
              or use "pls commands" in any channel.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index
