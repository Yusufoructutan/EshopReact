'use client';

import { useState, useCallback, useEffect } from 'react';
import SetQuantity from "@/app/components/Products/SetQuantity";
import { Rating } from "@mui/material";
import { useCart } from '@/hooks/useCart';
import { MdCheckCircle } from 'react-icons/md';
import { useRouter } from 'next/navigation'; // Güncellenmiş import
import Button from '@/app/components/Buttons/Button';

interface ProductCategory {
    productCategoryId: number;
    categoryId: number;
    categoryName: string;
}

interface Product {
    productId: number;
    name: string;
    price: number;
    productImage: string;
    description: string;
    stockQuantity: number;
    productCategories: ProductCategory[];
}

interface ProductDetailsProps {
    product: Product;
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const { cartProducts, handleAddProductToCart } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (cartProducts) {
            const existingIndex = cartProducts.findIndex(item => item.productId === product.productId);
            setIsProductInCart(existingIndex > -1);
        }
    }, [cartProducts, product.productId]);

    const [quantity, setQuantity] = useState(1);

    const handleQtyIncrease = useCallback(() => {
        if (quantity < product.stockQuantity) {
            setQuantity(q => q + 1);
        }
    }, [quantity, product.stockQuantity]);

    const handleQtyDecrease = useCallback(() => {
        if (quantity > 1) {
            setQuantity(q => q - 1);
        }
    }, [quantity]);

    if (!product) return <div>Loading...</div>;

    const categoryNames = product.productCategories.map(cat => cat.categoryName).join(', ');

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
    
        setIsAddingToCart(true);
        setSuccessMessage(null); // Önceki başarı mesajını temizleyin
    
        try {
            await handleAddProductToCart({
                productId: product.productId,
                quantity
            });
    
            setSuccessMessage('Product successfully added to cart!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            setSuccessMessage('Failed to add product to cart.'); // Hata durumunda bir mesaj gösterin
        } finally {
            setIsAddingToCart(false);
        }
    };
    

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <img src={product.productImage} alt={product.name} className="w-full h-auto" />
            </div>

            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={3} />
                </div>
                <Horizontal />
                <div className="text-justify">{product.description}</div>
                <Horizontal />
                <div>
                    <span className="font-semibold">Category:</span> {categoryNames}
                </div>
                <div>
                    <span className="font-semibold">Stock Quantity: </span> {product.stockQuantity}
                </div>

                <Horizontal />
                {successMessage && (
                    <p className='mb-2 text-teal-400 flex items-center gap-1'>
                        <MdCheckCircle size={20} />
                        <span>{successMessage}</span>
                    </p>
                )}
                {isProductInCart ? (
                    <>
                        <p className='mb-2 text-slate-500 flex items-center gap-1'>
                            <MdCheckCircle className='text-teal-400' size={20} />
                            <span>Product added to Cart</span>
                        </p>
                        <div className='max-w-[300px]'>
                            <Button label='View Cart' outline onClick={() => router.push("/cart")} />
                        </div>
                    </>
                ) : (
                    <>
                        <SetQuantity 
                            quantity={quantity}
                            handleQtyIncrease={handleQtyIncrease}
                            handleQtyDecrease={handleQtyDecrease}
                        />
                        <Horizontal />
                        <div>
                            <Button 
                                label='Add To Cart' 
                                onClick={handleAddToCart} 
                                disabled={isAddingToCart} 
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductDetails;
