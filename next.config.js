/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["upload.wikimedia.org", "ipfs.thirdwebcdn.com", "placehold.co"],
  },
};

module.exports = nextConfig;
