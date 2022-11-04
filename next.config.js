/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "media-exp1.licdn.com",
      "lh3.googleusercontent.com",
      "d33wubrfki0l68.cloudfront.net",
    ],
  },
};

module.exports = nextConfig
