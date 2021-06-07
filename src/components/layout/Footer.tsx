import Image from 'next/image'

export default function Footer() {
  return (
    <div className="footer container-fluid px-5 py-3 mt-5 pb-1 bg-darkergray text-center">
      <span className="small">
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
        <Image
          src="/img/vercel-logo.svg"
          alt="Powered by Vercel Logo"
          width={175}
          height={75}
        />
      </span>
    </div>
  )
}
