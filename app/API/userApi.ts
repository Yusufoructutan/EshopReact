import apiClient from './index'; 

export const loginUser = (data: { username: string; password: string }) => {
    return apiClient.post('/User/login', data)
        .then(response => response.data)
        .catch(() => {
        });
};
