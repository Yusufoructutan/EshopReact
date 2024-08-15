
interface Product {
    productId: number;
    name: string;
    price: number;
    description: string;
    productImage: string; 
}

interface ProductCardProps {
    data: {
      productId: number; 
      name: string;
      price: number;
      productImage: string;
    };
  }

  interface SetQtyProps {
    quantity: number;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}
