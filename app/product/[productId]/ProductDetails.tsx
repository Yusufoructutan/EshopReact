'use client';

import { useState, useCallback, useEffect } from 'react';
import SetQuantity from "@/app/components/Products/SetQuantity";
import { Rating } from "@mui/material";
import { useCart } from '@/hooks/useCart';
import { MdCheckCircle } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Buttons/Button';
import { useErrorStore } from '@/app/Store/errorStore';
import ErrorModal from '@/app/components/Modal/ErrorModal';

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
    product: Product | null;  // Ürün null olabilir
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const { cartProducts, handleAddProductToCart } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const router = useRouter();
    const { openErrorModal } = useErrorStore();

    useEffect(() => {
        if (product && product.productId) {
            const existingIndex = cartProducts.findIndex(
                (item) => item.productId === product.productId
            );
            setIsProductInCart(existingIndex > -1);
        }
    }, [cartProducts, product]);

    const [quantity, setQuantity] = useState(1);

    const handleQtyIncrease = useCallback(() => {
        if (product && product.stockQuantity !== undefined) {
            if (quantity < product.stockQuantity) {
                setQuantity(q => q + 1);
            }
        }
    }, [quantity, product]);

    const handleQtyDecrease = useCallback(() => {
        if (quantity > 1) {
            setQuantity(q => q - 1);
        }
    }, [quantity]);

    const categoryNames = product?.productCategories.map(cat => cat.categoryName).join(', ') || '';

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        setIsAddingToCart(true);

        try {
            if (product) {  // Product var mı kontrolü ekledik
                await handleAddProductToCart({
                    productId: product.productId,
                    quantity
                });
            }
        } catch (error: any) {
            openErrorModal('An error occurred while adding the product to the cart.');
        } finally {
            setIsAddingToCart(false);
        }
    };

    if (!product) {
        return <p>Product not found</p>;
    }

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

            <ErrorModal />
        </div>
    );
}

export default ProductDetails;
