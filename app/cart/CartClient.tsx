'use client';

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Button from "../components/Products/Button";
import ItemContent from "./ItemContent";
import { useEffect, useState } from "react";

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

const CartClient = () => {
    const [carts, setCarts] = useState<CartProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ill1c3VmIiwibmFtZWlkIjoiMSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTcyMzQxMDkwMSwiZXhwIjoxNzIzNDE0NTAxLCJpYXQiOjE3MjM0MTA5MDEsImlzcyI6InlvdXJJc3N1ZXIiLCJhdWQiOiJ5b3VyQXVkaWVuY2UifQ.UmJ5PIbdNDuSuGX82QsN-3Rg_Mf-nBcXWgvFE2DTruk';
                
                // Cart verilerini çek  
                const cartResponse = await fetch('https://localhost:7125/api/Cart', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
        
                if (!cartResponse.ok) {
                    throw new Error('Failed to fetch cart data');
                }
        
                const cartData: Cart[] = await cartResponse.json();
        
                // Ürün detaylarını çek
                const productDetailsPromises = cartData.map(async (item: Cart) => {
                    try {
                        const productResponse = await fetch(`https://localhost:7125/api/Product/${item.productId}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });

                        if (!productResponse.ok) {
                            console.error(`Failed to fetch product ${item.productId}. Status: ${productResponse.status}`);
                            return null;
                        }

                        const product = await productResponse.json();
                        
                        return {
                            cartItemId: item.cartItemId,
                            productId: item.productId,
                            name: product.name,
                            price: product.price,
                            productImage: product.productImage,
                            quantity: item.quantity
                        };
                    } catch (error: any) {
                        console.error(`Error fetching details for product ${item.productId}:`, error);
                        return null;
                    }
                });

                const productDetails = await Promise.all(productDetailsPromises);
        
                const validData: CartProductType[] = productDetails.filter(
                    (item): item is CartProductType => item !== null
                );

                setCarts(validData);
            } catch (error: any) {
                console.error('Error fetching products:', error);
                setError("An error occurred while fetching products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const updateQuantity = async (cartItemId: number, newQuantity: number) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ill1c3VmIiwibmFtZWlkIjoiMSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTcyMzQxMDkwMSwiZXhwIjoxNzIzNDE0NTAxLCJpYXQiOjE3MjM0MTA5MDEsImlzcyI6InlvdXJJc3N1ZXIiLCJhdWQiOiJ5b3VyQXVkaWVuY2UifQ.UmJ5PIbdNDuSuGX82QsN-3Rg_Mf-nBcXWgvFE2DTruk';
            
            const updateResponse = await fetch(`https://localhost:7125/api/Cart/${cartItemId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItemId: cartItemId,
                    quantity: newQuantity
                })
            });
    
            if (!updateResponse.ok) {
                throw new Error('Failed to update quantity');
            }
    
            setCarts(prevCarts => 
                prevCarts.map(cartItem =>
                    cartItem.cartItemId === cartItemId
                        ? { ...cartItem, quantity: newQuantity }
                        : cartItem
                )
            );
        } catch (error: any) {
            console.error('Error updating quantity:', error);
        }
    };

    const deleteItem = async (cartItemId: number) => {
        try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ill1c3VmIiwibmFtZWlkIjoiMSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTcyMzQxMDkwMSwiZXhwIjoxNzIzNDE0NTAxLCJpYXQiOjE3MjM0MTA5MDEsImlzcyI6InlvdXJJc3N1ZXIiLCJhdWQiOiJ5b3VyQXVkaWVuY2UifQ.UmJ5PIbdNDuSuGX82QsN-3Rg_Mf-nBcXWgvFE2DTruk';
            
            const deleteResponse = await fetch(`https://localhost:7125/api/Cart/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!deleteResponse.ok) {
                throw new Error('Failed to delete item');
            }
    
            setCarts(prevCarts => prevCarts.filter(cartItem => cartItem.cartItemId !== cartItemId));
        } catch (error: any) {
            console.error('Error deleting item:', error);
        }
    };
    
    const handleIncrease = (cartItemId: number, currentQuantity: number) => {
        updateQuantity(cartItemId, currentQuantity + 1);
    };

    const handleDecrease = (cartItemId: number, currentQuantity: number) => {
        if (currentQuantity > 1) {
            updateQuantity(cartItemId, currentQuantity - 1);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (carts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your Cart is empty</div>
                <div>
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-8 mb-6">Shopping Cart</h1>
            <div className="grid grid-cols-4 text-xs gap-4 pb-2 items-center mt-20 border-b border-gray-300">
                <div className="font-semibold">PRODUCT</div>
                <div className="font-semibold">PRICE</div>
                <div className="font-semibold">QUANTITY</div>
                <div className="font-semibold">TOTAL</div>
            </div>
            <div className="space-y-4 mt-4">
                {carts.map((item) => (
                    <div key={item.productId} className="grid grid-cols-4 gap-4 items-center border-b border-gray-200 pb-4">
                        <div className="flex items-center space-x-4">
                            <img src={item.productImage} alt={item.name} className="w-16 h-16 object-cover" />
                            <span>{item.name}</span>
                            <button 
                                className="text-red-500"
                                onClick={() => deleteItem(item.cartItemId)}
                            >
                                Remove
                            </button>
                        </div>
                        <span>${item.price.toFixed(2)}</span>
                        <div className="flex items-center space-x-2">
                            <button 
                                className="bg-gray-200 px-2 py-1 rounded"
                                onClick={() => handleDecrease(item.cartItemId, item.quantity)}
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                                className="bg-gray-200 px-2 py-1 rounded"
                                onClick={() => handleIncrease(item.cartItemId, item.quantity)}
                            >
                                +
                            </button>
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4 mt-20">
                <div className="w-[90px]">
                    <Button label="Clear Cart" onClick={() => {}} small outline />
                </div>
                <div className="text-sm flex flex-col gap-1 items-start">
                    <div className="flex justify-between w-full text-base font-semibold">
                        <span>Subtotal</span>
                        <span>${(carts.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2)}</span>
                    </div>
                    <p className="text-slate-500">Taxes and shipping calculated at checkout</p>
                    <Button label="Checkout" onClick={() => {}} />
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartClient;
