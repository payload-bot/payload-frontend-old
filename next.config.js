const getBackendHost = () =>
  process.env.NODE_ENV !== 'production'
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
}
