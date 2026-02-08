export function getBaseUrl() {
    if (typeof window !== 'undefined') {
        // Browser
        return '';
    }

    // Server / Edge
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    // Local
    return 'http://localhost:3000';
}
