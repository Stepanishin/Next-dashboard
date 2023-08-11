/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "example.com",
      "images.pexels.com",
      "https://images.pexels.com/",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
};

const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

module.exports = nextConfig;
