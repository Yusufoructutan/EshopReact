

'use client';

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Button from "../components/Buttons/Button";
import { deleteCartItem, fetchCartData, fetchProductDetails, updateCartQuantity } from "../utils/cartUtils";

const CartClient = () => {
    const [carts, setCarts] = useState<CartProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const cartData: Cart[] = await fetchCartData(token);
                const productDetailsPromises = cartData.map(async (item) => {
                    try {
                        const product = await fetchProductDetails(item.productId, token);
                        return {
                            cartItemId: item.cartItemId,
                            productId: item.productId,
                            name: product.name,
                            price: product.price,
                            productImage: product.productImage,
                            quantity: item.quantity
                        };
                    } catch (error: any) {
                        console.error(`Ürün ${item.productId} detayları alınırken hata oluştu:`, error);
                        return null;
                    }
                });

                const productDetails = await Promise.all(productDetailsPromises);
                const validData: CartProductType[] = productDetails.filter(
                    (item): item is CartProductType => item !== null
                );
                setCarts(validData);
            } catch (error: any) {
                console.error('Ürünleri çekerken hata oluştu:', error);
                setError("Ürünler alınırken bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [router]);

    const handleUpdateQuantity = async (cartItemId: number, newQuantity: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Kullanıcı doğrulanmamış.');
            return;
        }

        try {
            await updateCartQuantity(cartItemId, newQuantity, token);
            setCarts(prevCarts =>
                prevCarts.map(cartItem =>
                    cartItem.cartItemId === cartItemId
                        ? { ...cartItem, quantity: newQuantity }
                        : cartItem
                )
            );
        } catch (error: any) {
            console.error('Miktar güncellenirken hata oluştu:', error);
        }
    };

    const handleDeleteItem = async (cartItemId: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Kullanıcı doğrulanmamış.');
            return;
        }

        try {
            await deleteCartItem(cartItemId, token);
            setCarts(prevCarts => prevCarts.filter(cartItem => cartItem.cartItemId !== cartItemId));
        } catch (error: any) {
            console.error('Ürün silinirken hata oluştu:', error);
        }
    };

    const handleIncrease = (cartItemId: number, currentQuantity: number) => {
        handleUpdateQuantity(cartItemId, currentQuantity + 1);
    };

    const handleDecrease = (cartItemId: number, currentQuantity: number) => {
        if (currentQuantity > 1) {
            handleUpdateQuantity(cartItemId, currentQuantity - 1);
        }
    };

    const calculateTotal = () => {
        return carts.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (carts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Sepetiniz boş</div>
                <div>
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Alışverişe Başla</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-8 mb-6">Alışveriş Sepeti</h1>
            <div className="grid grid-cols-4 text-xs gap-4 pb-2 items-center mt-20 border-b border-gray-300">
                <div className="font-semibold">ÜRÜN</div>
                <div className="font-semibold">FİYAT</div>
                <div className="font-semibold">MİKTAR</div>
                <div className="font-semibold">TOPLAM</div>
            </div>
            <div className="space-y-4 mt-4">
                {carts.map((item) => (
                    <div key={item.productId} className="grid grid-cols-4 gap-4 items-center border-b border-gray-200 pb-4">
                        <div className="flex items-center space-x-4">
                            <img src={item.productImage} alt={item.name} className="w-16 h-16 object-cover" />
                            <span>{item.name}</span>
                            <button 
                                className="text-red-500"
                                onClick={() => handleDeleteItem(item.cartItemId)}
                            >
                                Kaldır
                            </button>
                        </div>
                        <span>${item.price.toFixed(2)}</span>
                        <div className="flex items-center space-x-2">
                            <button 
                                className="px-2 py-1 border rounded"
                                onClick={() => handleDecrease(item.cartItemId, item.quantity)}
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                                className="px-2 py-1 border rounded"
                                onClick={() => handleIncrease(item.cartItemId, item.quantity)}
                            >
                                +
                            </button>
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-6 text-xl font-semibold">
                <span>Toplam Tutar:</span>
                <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="text-right mt-4">
                <Button label="Sepeti Onayla" onClick={() => {/* Sepeti onayla işlemini yap */}}  />
            </div>
        </div>
    );
};

export default CartClient;
