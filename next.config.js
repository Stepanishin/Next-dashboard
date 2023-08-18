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
  env: {
    storyblokApiToken: process.env.STORYBLOK_API_TOKEN,
  },
};

module.exports = nextConfig;
