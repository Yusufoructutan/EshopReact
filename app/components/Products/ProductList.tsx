'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

interface Product {
    productId: number;
    name: string;
    price: number;
    description: string;
    productImage: string; // Ürün resim URL'si
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:7125/api/Product');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const text = await response.text();
        console.log('Response Text:', text); // Yanıtı kontrol edin
        const data = JSON.parse(text); // JSON olarak ayrıştırın
        console.log('Parsed Data:', data); // Ayrıştırılmış veriyi kontrol edin
        setProducts(data);
      } catch (error: any) {
        console.error('Error fetching products:', error);
        setError("An error occurred while fetching products.");
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
