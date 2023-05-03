/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output:'export',
  basePath: '/where-is-my-ether',
  images:{
    unoptimized:true,
  }
}

module.exports = nextConfig
