'use client';

import { useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchProductsData } from '@/app/API/productApi'; // Ürünleri alacak API fonksiyonu
import { useErrorStore } from '@/app/Store/errorStore';
import { useSearchContext } from '@/app/context/SearchContext';

const ProductsList = () => {
  const { searchResults, setSearchResults } = useSearchContext(); // Context'ten veri ve set fonksiyonu al
  const { openErrorModal } = useErrorStore(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProductsData();
        setSearchResults(data); // Başlangıçta ürünleri yükle
      } catch (error) {
        openErrorModal("Ürünleri yüklerken bir hata oluştu. Lütfen tekrar deneyin."); 
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
          <p>Ürünler yükleniyor...</p> // İlk başta veri yüklenirken bilgi ver
        )}
      </div>
    </div>
  );
};

export default ProductsList;
