import { parseCookies } from 'nookies';

export function getToken() {
    const cookies = parseCookies();
    return cookies.token;
}
