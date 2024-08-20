import apiClient from './index';
import { Order } from './orderType';

export const fetchUserOrders = async (): Promise<Order[]> => {
    try {
      const response = await apiClient.get('/Order');
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Error fetching user orders:', error.response.data);
      } else {
        console.error('Error fetching user orders:', error.message);
      }
      throw new Error('Siparişler alınırken bir hata oluştu.');
    }
  };
  
