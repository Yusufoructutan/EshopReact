// app/product/[productId]/page.tsx
"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import Container from '@/app/components/container';
import ProductDetails from './ProductDetails';

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

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                try {
                    const response = await fetch(`https://localhost:7125/api/Product/${productId}`);
                    if (!response.ok) {
                        throw new Error('Error fetching product');
                    }
                    const data: Product = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className='p-8'>
            <Container>
                <ProductDetails product={product} />
            </Container>
        </div>
    );
};

export default ProductPage;
