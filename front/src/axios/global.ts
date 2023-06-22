import axios from 'axios';
import { parseCookies } from 'nookies';

const apiFetch = axios.create({
    baseURL: 'url',
    headers: {
        Accept: 'application/json',
    },
});

const adminFetch = axios.create({
    baseURL: 'url',
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
