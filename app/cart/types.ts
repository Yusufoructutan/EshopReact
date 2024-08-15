interface Cart {
    cartItemId: number;
    userId: number;
    productId: number;
    quantity: number;
}

interface CartProductType {
    cartItemId: number;
    productId: number;
    name: string;
    price: number;
    productImage: string;
    quantity: number;
}