import jwtDecode from 'jwt-decode';

import { getToken } from './getToken';

export function isAuthenticated() {
    const token = getToken();
    if (!token) {
        return false;
    }

    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
}
