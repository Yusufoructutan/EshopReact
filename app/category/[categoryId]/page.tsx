'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from '@/app/components/Products/ProductCard';
import { categoryNames } from '@/app/utils/categoryNames';
import { fetchProductsByCategory } from '@/app/API/productApi';
import { useErrorStore } from '@/app/Store/errorStore';

const CategoryPage = () => {
    const params = useParams();
    const categoryId = Array.isArray(params.categoryId) ? params.categoryId[0] : params.categoryId;

    const [products, setProducts] = useState<any[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");
    const { openErrorModal } = useErrorStore(); 

    useEffect(() => {
        const fetchData = async () => {
            if (categoryId) {
                try {
                    const productsData = await fetchProductsByCategory(parseInt(categoryId));
                    setProducts(productsData);

                    const name = categoryNames[parseInt(categoryId)] || "Unknown Category";
                    setCategoryName(name);
                } catch (error: any) {
                } 
            }
        };

        fetchData();
    }, [categoryId, openErrorModal]); 

    return (
        <div className="container mx-auto px-4 py-8">
          
                <>
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{categoryName}</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <ProductCard key={product.productId} data={product} />
                        ))}
                    </div>
                </>
         
        </div>
    );
};

export default CategoryPage;
