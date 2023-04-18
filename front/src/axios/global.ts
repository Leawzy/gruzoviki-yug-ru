import axios from 'axios';

const apiFetch = axios.create({
    baseURL: 'http://api.ch32081.tw1.ru',
    headers: {
        Accept: 'application/json',
    },
});

export { apiFetch };
