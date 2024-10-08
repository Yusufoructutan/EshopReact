'use client'

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

const CarCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();

  return (
    <div className="relative cursor-pointer" onClick={() => router.push("/cart")}>
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span className="absolute
        top-[-10px]
        right-[-10px]
        text-white
        h-6
        w-6
        rounded-full
        flex
        items-center
        justify-center
        text-sm">
        {}
      </span>
    </div>
  );
}

export default CarCount;
