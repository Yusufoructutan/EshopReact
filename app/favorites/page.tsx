'use client'
import { useState, useEffect } from 'react';
import ProductCard from '../components/Products/ProductCard';
import { fetchProductsData } from '../API/productApi';



const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const getUserIdFromToken = (token: string) => {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.nameid;
        } catch (error) {
         
        }
      };

      const userId = getUserIdFromToken(token);
      if (userId) {
        const favoritedItems: FavoritedItem[] = JSON.parse(localStorage.getItem(`favorites_${userId}`) || '[]');


        const productIds = favoritedItems
          .map(item => {
            return item;
          });


        fetchProductsData()
          .then((products: Product[]) => {

            const favoriteProducts = products.filter(product => productIds.includes(product.productId));

            setFavorites(favoriteProducts);
          })
          .catch(error => {
            console.error('Error fetching products:', error);
            setError('Ürünler alınırken bir hata oluştu.');
          });
      } else {
        setError('Geçersiz kullanıcı bilgileri.');
      }
    } else {
      setError('Giriş yapmadınız.');
    }
  }, []);

 

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
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
    </div>
  );
};

export default FavoritesPage;