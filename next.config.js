const getBackendHost = () =>
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? 'https://api.payload.tf'
    : 'http://localhost'

module.exports = {
  async rewrites() {
    const host = getBackendHost()

    return [
      {
        source: '/api/:urls*',
        destination: `${host}/api/:urls*`,
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/invite',
        destination: 'https://discordapp.com/oauth2/authorize?client_id=644333502870978564&permissions=388161&scope=bot',
        permanent: true,
      },
      {
        source: '/discord',
        destination: 'https://discord.com/invite/gYnnMYz',
        permanent: true,
      },
    ]
  },
}
