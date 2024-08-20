
export interface OrderItem {
    orderItemId: number; // Match casing with API response
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    productName?: string; // Add productName here
    productImage?: string; // Eklenen alan

}

export interface Order {
    orderId: number;
    userId: number;
    orderDate: string; // Assuming this is returned as a string from the API
    totalAmount: number;
    orderItems: OrderItem[];
}


