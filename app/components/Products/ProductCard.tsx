"use client";

import Rating from '@mui/material/Rating';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useErrorStore } from '@/app/Store/errorStore'; 

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
  const defaultImage = '/path/to/placeholder-image.jpg'; 
  const [isFavorited, setIsFavorited] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const { openErrorModal } = useErrorStore(); 

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
      if (userId !== null) {
        setUserId(userId);
        const favoritedItems = JSON.parse(localStorage.getItem(`favorites_${userId}`) || '[]');
        setIsFavorited(favoritedItems.includes(data.productId));
      }
    }
  }, [data.productId, openErrorModal]);

  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false);

  const toggleFavorite = () => {
    const token = localStorage.getItem('token');
    if (token && userId !== null) {
      try {
        let favoritedItems = JSON.parse(localStorage.getItem(`favorites_${userId}`) || '[]');
  
        if (isFavorited) {
          favoritedItems = favoritedItems.filter((id: number) => id !== data.productId);
        } else {
          favoritedItems.push(data.productId);
          setShowFavoriteMessage(true);  // Mesajı göster
          setTimeout(() => setShowFavoriteMessage(false), 3000);  
        }
  
        localStorage.setItem(`favorites_${userId}`, JSON.stringify(favoritedItems));
        setIsFavorited(!isFavorited);
      } catch (error) {
    
      }
    }
  };
  
  
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
                e.preventDefault(); 
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
