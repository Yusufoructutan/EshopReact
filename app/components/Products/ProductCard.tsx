"use client";
import Rating from '@mui/material/Rating';
import Image from 'next/image';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

// ProductCard için tür tanımı
interface ProductCardProps {
  data: {
    productId: number;
    productImage?: string;
    name: string;
    price: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const defaultImage = '/path/to/placeholder-image.jpg'; // Yer tutucu görsel yolu
  // Favori durumu için state tanımlayın
  const [isFavorited, setIsFavorited] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  // Bileşen yüklendiğinde kullanıcı ID'sini ve favori ürün durumunu kontrol edin
  useEffect(() => {
    const token = localStorage.getItem('token');
   
    if (token) {
      // Kullanıcı ID'sini token'dan alın
      const getUserIdFromToken = (token: string) => {
  
  
        try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.nameid; // `sub` veya `userId` gibi alanları kontrol edin
  } catch (error) {
    console.error("Token ayrıştırılırken bir hata oluştu:", error);
    return null;
  }
};

      const userId = getUserIdFromToken(token);
      setUserId(userId);

      // Favori ürünlerin olup olmadığını kontrol edin
      const favoritedItems = JSON.parse(localStorage.getItem(`favorites_${userId}`) || '[]');
      setIsFavorited(favoritedItems.includes(data.productId));
    }
  }, [data.productId]);

  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false);

  const toggleFavorite = () => {
    const token = localStorage.getItem('token');
    
    if (token && userId !== null) {
      let favoritedItems = JSON.parse(localStorage.getItem(`favorites_${userId}`) || '[]');
  
      if (isFavorited) {
        favoritedItems = favoritedItems.filter((id: number) => id !== data.productId);
      } else {
        favoritedItems.push(data.productId);
        setShowFavoriteMessage(true);  // Mesajı göster
        setTimeout(() => setShowFavoriteMessage(false), 3000);  // Mesajı 3 saniye sonra gizle
      }
  
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(favoritedItems));
      setIsFavorited(!isFavorited);
    }
  };
  
  // Render içinde:
  {showFavoriteMessage && (
    <div className="absolute top-0 left-0 w-full bg-green-500 text-white text-center py-2">
      Favorilere eklendi!
    </div>
  )}

  return (
    <Link href={`/product/${data.productId}`}>
      <div
        className="flex flex-col border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm max-w-xs h-[400px] bg-white shadow-lg overflow-hidden"
      >
        <div className="relative w-full h-[200px] overflow-hidden bg-gray-200">
          <Image
            src={data.productImage || defaultImage}
            alt={data.name}
            layout="fill"
            objectFit="contain"
            className="object-contain"
          />

          {/* Favori için Kalp İkonu */}
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={(e) => {
                e.preventDefault(); // Kalbe tıklarken yönlendirmeyi engelleyin
                toggleFavorite();
              }}
            >
              {isFavorited ? (
                <FaHeart className="text-red-600" />
              ) : (
                <FaRegHeart className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-4 flex-grow">
          <div className="text-lg font-semibold">{data.name}</div>
          <div className="mt-1">
            <Rating value={3} readOnly />
          </div>
          <div className="mt-1 text-xl font-bold">${data.price.toFixed(2)}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
