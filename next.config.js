const getBackendHost = () =>
  ['production', 'staging'].includes(process.env.NEXT_PUBLIC_ENV)
    ? 'https://api.payload.tf'
    : 'http://localhost:8080'

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
    const host = getBackendHost()

    return [
      {
        source: '/login',
        destination: `${host}/api/auth/discord`,
        permanent: true,
      },
      {
        source: '/invite',
        destination:
          'https://discord.com/api/oauth2/authorize?client_id=644333502870978564&permissions=67496000&redirect_uri=https%3A%2F%2Fapi.payload.tf%2Fapi%2Fauth%2Fdiscord%2Fcallback&scope=bot%20applications.commands',
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
