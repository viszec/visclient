/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
      {
        source: '/work',
        destination: '/',
      },
      {
        source: '/services',
        destination: '/',
      },
      {
        source: '/contact',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
