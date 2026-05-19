/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  async redirects() {
    return [
      {
        source: '/app',
        destination: '/launchpad',
        permanent: true,
      },
      {
        source: '/app/:path*',
        destination: '/launchpad/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
