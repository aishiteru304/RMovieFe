import axios from 'axios';


const axiosWithHeader = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

// Add a request interceptor
axiosWithHeader.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token !== null) {
            const accessToken = JSON.parse(token).token
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        // Check if the request data is FormData
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosWithHeader;

