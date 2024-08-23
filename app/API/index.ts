import axios from 'axios';
import { useErrorStore } from '../Store/errorStore';

const API_URL = 'https://localhost:7125/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    useErrorStore.getState().openErrorModal('Şu an işleminizi gerçekleştiremiyoruz. Lütfen daha sonra tekrar deneyiniz.')
    return Promise.reject(error);
});

apiClient.interceptors.response.use((config) => {
    return config;
}, (error) => {
    useErrorStore.getState().openErrorModal('Şu an işleminizi gerçekleştiremiyoruz. Lütfen daha sonra tekrar deneyiniz.')
    return Promise.reject(error);
});


export default apiClient;
