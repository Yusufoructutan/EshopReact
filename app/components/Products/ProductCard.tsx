"use client";
import Rating from '@mui/material/Rating';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  data: {
    productId: number; 
    name: string;
    price: number;
    productImage: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const defaultImage = '/path/to/placeholder-image.jpg'; // Yer tutucu resim yolu

  return (
    <Link href={`/product/${data.productId}`}> 
      <div
        className="flex flex-col
        border-[1.2px]
        border-slate-200
        bg-slate-50
        rounded-sm
        p-2
        transition
        hover:scale-105
        text-center
        text-sm
        max-w-xs
        h-[400px] // Kart yüksekliği
        bg-white
        shadow-lg
        overflow-hidden"
      >
        <div className="relative w-full h-[200px] overflow-hidden bg-gray-200">
          {/* Resim kapsayıcısının yüksekliği */}
          <Image
            src={data.productImage || defaultImage}
            alt={data.name}
            layout="fill"
            objectFit="contain" // Resmi kapsayıcıya uygun şekilde kaplar ve kırpma yapmaz
            className="object-contain"
          />
        </div>
        <div className='mt-4 flex-grow'>
          <div className='text-lg font-semibold'>{data.name}</div>
          <div className='mt-1'><Rating value={3} /></div>
          <div className='mt-1 text-xl font-bold'>${data.price.toFixed(2)}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
