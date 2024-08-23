
export interface OrderItem {
    orderItemId: number; 
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    productName?: string; 
    productImage?: string; 

}

export interface Order {
    orderId: number;
    userId: number;
    orderDate: string; 
    totalAmount: number;
    orderItems: OrderItem[];
}


