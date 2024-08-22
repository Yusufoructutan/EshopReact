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
    const [loading, setLoading] = useState(true);
    const { openErrorModal } = useErrorStore(); // Zustand'dan fonksiyonu import ettik

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await fetchProductsByCategory(categoryId);
                setProducts(data);
            } catch (error: any) {
                openErrorModal(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId, openErrorModal]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-3 gap-4">
            {products.map(product => (
                <ProductCard key={product.productId} data={product} />
            ))}
        </div>
    );
};

export default CategoryProductList;
