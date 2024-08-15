"use client";

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { fetchProductsByCategory } from '@/app/utils/api';

interface CategoryProductListProps {
    categoryId: number;
}

const CategoryProductList = ({ categoryId }: CategoryProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await fetchProductsByCategory(categoryId);
                setProducts(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-3 gap-4">
            {products.map(product => (
                <ProductCard key={product.productId} data={product} />
            ))}
        </div>
    );
};

export default CategoryProductList;
