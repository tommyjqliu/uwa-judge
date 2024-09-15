/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "standalone",
    typescript: {
        // fix them later
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreBuildErrors: true,
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
