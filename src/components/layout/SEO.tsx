export default function SEO() {
  return (
    <>
      {/* SEO :/ */}
      <title>Payload</title>
      <meta name="title" content="Payload" />
      <meta name="theme-color" content="#0074D9" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="5 days" />
      <meta name="author" content="24" />
      <meta
        name="description"
        content="TF2-oriented Discord bot that brings services like logs.tf or the fun pushcart leaderboard directly in your Discord server."
      />
      <meta
        name="keywords"
        content="tf2, payload, payload tf2, payload bot, payload tf2 discord bot, discord bot, tf2 discord bot"
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://payload.tf/" />
      <meta property="og:title" content="Payload" />
      <meta property="og:image" content="/img/logo.png" />
      <meta
        property="og:description"
        content="TF2-oriented Discord bot that brings services like logs.tf or the fun pushcart leaderboard directly in your Discord server."
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://payload.tf/" />
      <meta property="twitter:title" content="Payload" />
      <meta property="twitter:image" content="/img/logo.png" />
      <meta
        property="twitter:description"
        content="TF2-oriented Discord bot that brings services like logs.tf or the fun pushcart leaderboard directly in your Discord server."
      />
    </>
  )
}
