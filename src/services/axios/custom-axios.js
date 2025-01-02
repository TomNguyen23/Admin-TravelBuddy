import axios from 'axios';
import { store } from '@/redux/store';

const instance = axios.create({
    // baseURL: 'http://localhost:8080'
    baseURL: "https://travel-buddy-production-6a3f.up.railway.app"
});

// Add a request interceptor
instance.interceptors.request.use(
    config => {
        const state = store.getState();
        const token = state.auth.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            // Bypass CORS
            config.headers['Access-Control-Allow-Origin'] = '*';
            config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
            config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
            // MAX AGE
            config.headers['Access-Control-Max-Age'] = 86400;
            config.headers['Access-Control-Allow-Credentials'] = true;
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