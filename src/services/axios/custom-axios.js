import axios from 'axios';
import { store } from '@/redux/store';

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

// Add a request interceptor
instance.interceptors.request.use(
    config => {
        const state = store.getState();
        const token = state.auth.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;