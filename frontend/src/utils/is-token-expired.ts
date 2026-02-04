import { jwtDecode } from 'jwt-decode';

export function isTokenExpired(token: string): boolean {
    if (!token) return true;
    try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch {
        return true;
    }
}
