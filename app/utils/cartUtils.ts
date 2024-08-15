// api.ts

const API_URL = 'https://localhost:7125/api';

export const fetchCartData = async (token: string) => {
    const response = await fetch(`${API_URL}/Cart`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Sepet verilerini çekme başarısız oldu');
    return response.json();
};

export const fetchProductDetails = async (productId: number, token: string) => {
    const response = await fetch(`${API_URL}/Product/${productId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error(`Ürün ${productId} bilgileri alınamadı`);
    return response.json();
};

export const updateCartQuantity = async (cartItemId: number, newQuantity: number, token: string) => {
    const response = await fetch(`${API_URL}/Cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cartItemId, quantity: newQuantity })
    });
    if (!response.ok) throw new Error('Miktar güncelleme başarısız oldu');
};

export const deleteCartItem = async (cartItemId: number, token: string) => {
    const response = await fetch(`${API_URL}/Cart/${cartItemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Ürün silme başarısız oldu');
};
