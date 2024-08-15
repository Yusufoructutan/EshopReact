'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { fetchProductsData } from '@/app/utils/api';



const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProductsData();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.productId} data={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
