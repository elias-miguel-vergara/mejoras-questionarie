/** @type {import('next').NextConfig} */
const nextConfig = {}

export default (phase, { defaultConfig }) => {
  if (phase === 'phase-development-server') {
    return {
      ...defaultConfig,
      // async redirects() {
      //   return [{ source: '/', destination: '/development', permanent: false }]
      // },
    }
  }

  return {
    ...defaultConfig,
    output: 'export',
    basePath: '/quetionnaire',
  }
}
