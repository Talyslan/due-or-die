import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        optimizePackageImports: [
            'lucide-react',
            'date-fns',
            'lodash',
            'recharts',
        ],
    },
    turbopack: {
        root: __dirname,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8080/:path*',
            },
        ];
    },
};

export default nextConfig;
