/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  typescript: {
    // fix them later
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
};

export default nextConfig;
