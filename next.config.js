/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_API_URL: "https://text-to-speech-api3.p.rapidapi.com",
    "X-RapidAPI-Key": "aa99057212msh0319760089ff124p183a2fjsnce313ea5e2f8",
    "X-RapidAPI-Host": "text-to-speech-api3.p.rapidapi.com",
  },
};

module.exports = nextConfig;
