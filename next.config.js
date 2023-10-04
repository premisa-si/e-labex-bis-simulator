/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/simulator/send-referral",
  //       destination: "http://localhost:7071/api/external",
  //     },
  //   ];
  // },
}

module.exports = nextConfig
