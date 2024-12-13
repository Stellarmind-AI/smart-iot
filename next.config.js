/** @type {import('next').NextConfig} */

// const withTM = require('next-transpile-modules')(['@babel/preset-react']);
//   '@fullcalendar/common',
//   '@fullcalendar/common',
//   '@fullcalendar/daygrid',
//   '@fullcalendar/interaction',
//   '@fullcalendar/react',
// next.config.js
module.exports = {
  webpack: (config) => {
    config.cache = false; // Disable Webpack caching
    return config;
  },
};

const nextConfig = {

  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    // Make ENV
    unoptimized: true,
  },
  experimental: {},
  eslint: {
    ignoreDuringBuilds: true,
  },

};

// next.config.js
module.exports = {
  target: 'webworker',
  // other configurations
};


module.exports = nextConfig;
