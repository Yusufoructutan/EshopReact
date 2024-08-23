'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { fetchProductsByCategory } from '@/app/API/productApi';
import { useErrorStore } from '@/app/Store/errorStore';

interface CategoryProductListProps {
    categoryId: number;
}

const CategoryProductList = ({ categoryId }: CategoryProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const { openErrorModal } = useErrorStore(); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await fetchProductsByCategory(categoryId);
                setProducts(data);
            } catch (error: any) {
            }
        };

        fetchProducts();
    }, [categoryId, openErrorModal]);


    return (
        <div className="grid grid-cols-3 gap-4">
            {products.map(product => (
                <ProductCard key={product.productId} data={product} />
            ))}
        </div>
    );
};

export default CategoryProductList;
