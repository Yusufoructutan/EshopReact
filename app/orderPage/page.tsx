'use client';

import { useEffect, useState } from 'react';
import { Order } from '../API/orderType';
import { fetchUserOrders } from '../API/orderApi';
import { fetchProductById } from '../API/productApi';
import ErrorModal from '@/app/components/Modal/ErrorModal';
import { useErrorStore } from '@/app/Store/errorStore';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { openErrorModal } = useErrorStore(); 
  
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchUserOrders();
        const ordersWithProductNames = await Promise.all(
          data.map(async (order) => {
            const orderItemsWithNames = await Promise.all(
              order.orderItems.map(async (item) => {
                const product = await fetchProductById(item.productId);
                return { ...item, productName: product.name };
              })
            );
            return { ...order, orderItems: orderItemsWithNames };
          })
        );
        setOrders(ordersWithProductNames);
      } catch (err: any) {
      
      }
    };

    loadOrders();
  }, [openErrorModal]);


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-center mb-6">Siparişlerim</h1>
      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order.orderId} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">Sipariş Numarası: {order.orderId}</h2>
              <p className="text-gray-700 mb-2"><strong>Toplam Tutar:</strong> {order.totalAmount} TL</p>
              <p className="text-gray-700 mb-4"><strong>Sipariş Tarihi:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              <div className="border-t border-gray-300 pt-4">
                <h3 className="text-lg font-semibold mb-2">Sipariş Detayları</h3>
                {order.orderItems && order.orderItems.length > 0 ? (
                  <ul className="space-y-4">
                    {order.orderItems.map(item => (
                      <li key={item.orderItemId} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-gray-700 mb-1"><strong>Ürün Adı:</strong> {item.productName}</p>
                        <p className="text-gray-700 mb-1"><strong>Adet:</strong> {item.quantity}</p>
                        <p className="text-gray-700"><strong>Birim Fiyat:</strong> {item.unitPrice} TL</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Sipariş detayları bulunmuyor.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-100 text-gray-700 border border-gray-300 rounded-lg p-4">
            <p>Henüz siparişiniz bulunmuyor.</p>
          </div>
        )}
      </div>
      <ErrorModal /> 
    </div>
  );
};

export default OrdersPage;
