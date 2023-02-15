const withTM = require('next-transpile-modules')([
  '@aller/theming',
  '@aller/shared',
  '@aller/shiny',
])

const nextConfig = {
  publicRuntimeConfig: {
    env: process.env.NODE_ENV,
    covid19VaccinationApi: process.env.COVID19_VACCINATION_API_ENDPOINT,
  },

  ...withTM({
    webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
      config.resolve.extensions.push('ts', 'tsx', 'js', 'jsx')
      config.module.rules.push({
        test: /\.(ts|tsx|js|jsx)$/,
        use: ['babel-loader'],
      })
      return config
    },
  }),
}
module.exports = nextConfig
