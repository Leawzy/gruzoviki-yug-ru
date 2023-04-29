import axios from 'axios';
import { parseCookies } from 'nookies';

const apiFetch = axios.create({
    baseURL: 'http://5.167.50.180:8876',
    headers: {
        Accept: 'application/json',
    },
});

const adminFetch = axios.create({
    baseURL: 'http://5.167.50.180:8876/api/admin',
    headers: {
        Accept: 'application/json',
    },
});

const setAuthToken = () => {
    const cookies = parseCookies();
    const { token } = cookies;

    if (token) {
        apiFetch.defaults.headers.common.Authorization = `Bearer ${token}`;
        adminFetch.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete apiFetch.defaults.headers.common.Authorization;
    }
};

function dayOfLiveToken() {
    return 3 * 24 * 60 * 60;
}

export { adminFetch, apiFetch, dayOfLiveToken, setAuthToken };
