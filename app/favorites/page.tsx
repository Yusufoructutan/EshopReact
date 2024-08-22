'use client'

import { useState, useEffect } from 'react';
import ProductCard from '../components/Products/ProductCard';
import { fetchProductsData } from '../API/productApi';
import { useErrorStore } from '@/app/Store/errorStore'; // Import Zustand store hook

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { openErrorModal } = useErrorStore(); // Zustand store action

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const getUserIdFromToken = (token: string) => {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.nameid;
        } catch (error) {
          console.error("Token parsing error:", error);
          return null;
        }
      };

      const userId = getUserIdFromToken(token);
      if (userId) {
        const favoritedItems: FavoritedItem[] = JSON.parse(localStorage.getItem(`favorites_${userId}`) || '[]');
        const productIds = favoritedItems.map(item => item.productId);

        fetchProductsData()
          .then((products: Product[]) => {
            const favoriteProducts = products.filter(product => productIds.includes(product.productId));
            setFavorites(favoriteProducts);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching products:', error);
            openErrorModal('Ürünler alınırken bir hata oluştu.'); // Use Zustand store to open error modal
            setLoading(false);
          });
      } else {
        openErrorModal('Geçersiz kullanıcı bilgileri.'); // Use Zustand store to open error modal
        setLoading(false);
      }
    } else {
      openErrorModal('Giriş yapmadınız.'); // Use Zustand store to open error modal
      setLoading(false);
    }
  }, [openErrorModal]);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div>Yükleniyor...</div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">Favorilerim</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.length > 0 ? (
              favorites.map((product) => (
                <ProductCard key={product.productId} data={product} />
              ))
            ) : (
              <p>Favori ürününüz bulunmamaktadır.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
