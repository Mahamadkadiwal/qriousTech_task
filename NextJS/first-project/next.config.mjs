/** @type {import('next').NextConfig} */
const nextConfig = {
  // productionBrowserSourceMaps: true,
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ciqfsculszifrupzxmsk.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-image/**',
      },
    ],
  },
  
};

export default nextConfig;
