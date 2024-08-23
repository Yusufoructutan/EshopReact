import { Order } from "@/app/API/orderType";

// orderApi.ts
export const fetchOrderById = async (orderId: number, token: string): Promise<Order> => {
    const response = await fetch(`https://localhost:7125/api/Order/${orderId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.error('Hata kodu:', response.status); 
        throw new Error('Sipariş alınırken hata oluştu');
    }

    return response.json();
};
