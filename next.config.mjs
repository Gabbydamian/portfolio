/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // dangerouslyAllowSVG: true,
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "**.supabase.co",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "th.bing.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "placehold.co",
    //   },
    // ],
  },
  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "192.168.43.43",
  ],
};

export default nextConfig;
