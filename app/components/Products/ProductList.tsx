'use client';
import { fetchProductsData } from '@/app/API/productApi';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';


const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts =() => {
      
      fetchProductsData().then((data)=>{setProducts(data)})
      .catch((error)=>{error.message})
    }
    fetchProducts();
  }, []);

  return (
    <div >
    
        
        <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.productId} data={product} />
        ))}
      </div>
    </div>
  );

}

export default ProductsList;
