const nextConfig = {
  reactStrictMode: false,

  basePath: '/tms-web',

  eslint: {
    ignoreDuringBuilds: true
  },

  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
