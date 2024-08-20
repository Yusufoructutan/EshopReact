// src/api/cartApi.ts
import apiClient from './index';

export const fetchCartData = (token: string) => {
    return apiClient.get('/Cart')
        .then(response => response.data)
        .catch(error => {
            throw new Error(`Sepet verilerini çekme başarısız oldu: ${error.message}`);
        });
};

export const updateCartQuantity = (cartItemId: number, newQuantity: number, token: string) => {
    return apiClient.put(`/Cart/${cartItemId}`, { cartItemId, quantity: newQuantity })
        .then(response => response.data)
        .catch(error => {
            throw new Error(`Miktar güncelleme başarısız oldu: ${error.message}`);
        });
};

export const deleteCartItem = (cartItemId: number, token: string) => {
    return apiClient.delete(`/Cart/${cartItemId}`)
        .then(response => response.data)
        .catch(error => {
            throw new Error(`Ürün silme başarısız oldu: ${error.message}`);
        });
};
