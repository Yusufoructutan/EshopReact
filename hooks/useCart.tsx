import apiClient from "@/app/API";
import { createContext, useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";

export interface CartProductType {
    cartItemId: number; 
    productId: number;
    quantity: number; 
}

interface CartCreateType {
    productId: number;
    quantity: number; 
}

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[];
    handleAddProductToCart: (product: CartCreateType) => Promise<void>;
    handleRemoveProductFromCart: (cartItemId: number) => Promise<void>;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);

    const handleAddProductToCart = useCallback(async (product: CartCreateType): Promise<void> => {
        if (product.productId <= 0) {
            toast.error("Geçersiz ürün ID'si.");
            return; // No return value
        }

       
    }, []);

    const handleRemoveProductFromCart = useCallback(async (cartItemId: number): Promise<void> => {
        try {
            const response = await apiClient.delete(`/Cart/${cartItemId}`);

            if (response.status === 200) {
                toast.success("Ürün sepetten kaldırıldı.");
                setCartProducts(prev => {
                    const updatedCart = prev.filter(item => item.cartItemId !== cartItemId);
                    setCartTotalQty(updatedCart.length);
                    return updatedCart;
                });
            } else {
                toast.error(`Ürün sepetten kaldırılamadı: ${response.statusText}`);
            }
        } catch (error) {
            toast.error(`Bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
        }
    }, []);

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart, CartContextProvider içinde kullanılmalıdır.");
    }

    return context;
};
