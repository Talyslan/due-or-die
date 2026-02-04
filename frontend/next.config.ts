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
};

export default nextConfig;
