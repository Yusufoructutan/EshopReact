"use client";

import { useEffect, useState } from 'react';
import Container from '@/app/components/container';
import ProductDetails from './ProductDetails';
import ErrorModal from '@/app/components/Modal/ErrorModal';
import { useErrorStore } from '@/app/Store/errorStore';

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

const ProductPage = ({ params }: { params: { productId: string } }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const productId = params.productId;

    const { openErrorModal } = useErrorStore();

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                try {
                    const res = await fetch(`https://localhost:7125/api/Product/${productId}`);
                    if (!res.ok) {
                        throw new Error(`Error ${res.status}: ${res.statusText}`);
                    }
                    const data: Product = await res.json();
                    setProduct(data);
                } catch (error: any) {
                 
                }
            }
        };

        fetchProduct();
    }, [productId, openErrorModal]);


    return (
        <div className='p-8'>
            <Container>
                <ProductDetails product={product} />
            </Container>
            <ErrorModal />
        </div>
    );
};

export default ProductPage;
