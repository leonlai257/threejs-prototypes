/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname:
                    'coreality-showroom-testing.s3.ap-east-1.amazonaws.com',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
