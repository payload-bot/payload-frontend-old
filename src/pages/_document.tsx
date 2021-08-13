import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          {/* Font */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          
          {/* MUI */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />

          {/* SEO :/ */}
          <title>Payload</title>
          <meta name="title" content="Payload" />
          <meta
            name="description"
            content="TF2-oriented Discord bot that brings services like logs.tf or the fun pushcart leaderboard directly in your Discord server."
          />
          <meta
            name="keywords"
            content="tf2, payload, payload tf2, payload bot, payload tf2 discord bot, discord bot, tf2 discord bot"
          />
          <meta name="robots" content="index, follow" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="5 days" />
          <meta name="author" content="24" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://payload.tf/" />
          <meta property="og:title" content="Payload" />
          <meta
            property="og:description"
            content="TF2-oriented Discord bot that brings services like logs.tf or the fun pushcart leaderboard directly in your Discord server."
          />
          <meta property="og:image" content="https://payload.tf/img/logo.svg" />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://payload.tf/" />
          <meta property="twitter:title" content="Payload" />
          <meta
            property="twitter:description"
            content="TF2-oriented Discord bot that brings services like logs.tf or the fun pushcart leaderboard directly in your Discord server."
          />
          <meta
            property="twitter:image"
            content="https://payload.tf/img/logo.svg"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
