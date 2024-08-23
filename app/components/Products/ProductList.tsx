'use client';

import { useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchProductsData, fetchProductsDataV2 } from '@/app/API/productApi'; 
import { useErrorStore } from '@/app/Store/errorStore';
import { useSearchContext } from '@/app/context/SearchContext';

const ProductsList = () => {
  const { searchResults, setSearchResults } = useSearchContext(); 
  const { openErrorModal } = useErrorStore(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProductsData();
        setSearchResults(data); 
      } catch (error) {
      }
    };

    fetchProducts();
  }, [setSearchResults, openErrorModal]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {searchResults.length > 0 ? (
          searchResults.map(product => (
            <ProductCard key={product.productId} data={product} />
          ))
        ) : (
          <p>Ürünler yükleniyor...</p> 
        )}
      </div>
    </div>
  );
};

export default ProductsList;
