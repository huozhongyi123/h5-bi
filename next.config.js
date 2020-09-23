const isDev = process.env.NODE_ENV === 'development'

// Note: development use basePath 会自动刷新
const APP_PATH = isDev ? '' : '/warehouse'

module.exports = {
  env: {
    API_ROOT: process.env.API_ROOT,
  },
  assetPrefix: APP_PATH,
  exportTrailingSlash: true,
  experimental: {
    basePath: APP_PATH,
  },
}
