'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../Products/ProductCard';

interface Product {
    id: number;
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
          const response = await fetch('https://localhost:7125/api/Product'); // Backend API URL
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const data = await response.json();
          console.log(data); // Veriyi kontrol edin
          setProducts(data);
        } catch (error: any) {
          console.error('Error fetching products:', error); // Detaylı hata mesajı
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
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
