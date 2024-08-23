'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchOrderById } from './orderApi';
import { Order } from '@/app/API/orderType';
import ErrorModal from '@/app/components/Modal/ErrorModal';
import { useErrorStore } from '@/app/Store/errorStore';

const OrdersClient = () => {
    const [order, setOrder] = useState<Order | null>(null);
    const { orderId } = useParams();
    const router = useRouter();
    const { openErrorModal } = useErrorStore(); 

    useEffect(() => {
        if (!orderId) {
            return;
        }

        const fetchOrderData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const orderData = await fetchOrderById(Number(orderId), token);
                console.log('API Yanıtı:', orderData);
                setOrder(orderData);
            } catch (error: any) {
               
            } 
        };

        fetchOrderData();
    }, [orderId, router, openErrorModal]);

  

    if (!order) {
        return <div className="text-center text-xl text-gray-600">Sipariş bulunamadı.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Sipariş Detayları</h1>
            <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md">
                <div className="border-b pb-4 mb-4">
                    <h2 className="text-2xl font-semibold mb-2">Sipariş ID: {order.orderId}</h2>
                    <p className="text-lg mb-2">Toplam Tutar: <span className="font-bold text-green-600">${order.totalAmount.toFixed(2)}</span></p>
                    <p className="text-lg">Sipariş Tarihi: <span className="font-semibold text-gray-700">{new Date(order.orderDate).toLocaleDateString()}</span></p>
                </div>
                
                <h3 className="text-xl font-semibold mt-4 mb-4">Ürünler:</h3>
                {order.orderItems && order.orderItems.length > 0 ? (
                    <ul className="list-disc list-inside pl-4">
                        {order.orderItems.map((item) => (
                            <li key={item.orderItemId} className="mb-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="font-medium">Ürün ID:</span> {item.productId}
                                    </div>
                                    <div>
                                        <span className="font-medium">Miktar:</span> {item.quantity} x 
                                        <span className="font-medium"> Fiyat:</span> ${item.unitPrice.toFixed(2)}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Ürün bulunamadı.</p>
                )}
            </div>
            <ErrorModal /> 
        </div>
    );
};

export default OrdersClient;
