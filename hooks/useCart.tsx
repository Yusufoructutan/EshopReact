import apiClient from "@/app/API";
import { createContext, useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useErrorStore } from '@/app/Store/errorStore'; // Import Zustand store hook

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
    const { openErrorModal } = useErrorStore(); // Use Zustand store action for error modal

    const handleAddProductToCart = useCallback(async (product: CartCreateType): Promise<void> => {
        if (product.productId <= 0) {
            openErrorModal("Geçersiz ürün ID'si.");
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                openErrorModal("Oturum açmanız gerekiyor.");
                return;
            }
    
            const response = await apiClient.post('/Cart', {
                productId: product.productId,
                quantity: product.quantity,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
    
            if (response.status === 200 || response.status === 201) {
                toast.success("Ürün sepete eklendi.");
               
            } else {
                openErrorModal(`Ürün sepete eklenemedi: ${response.statusText}`);
            }
        } catch (error) {
            openErrorModal(`Bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
        }
    }, []);
    
    const handleRemoveProductFromCart = useCallback(async (cartItemId: number): Promise<void> => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                openErrorModal("Oturum açmanız gerekiyor.");
                return;
            }

            const response = await apiClient.delete(`/Cart/${cartItemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                toast.success("Ürün sepetten kaldırıldı.");
                setCartProducts(prev => {
                    const updatedCart = prev.filter(item => item.cartItemId !== cartItemId);
                    setCartTotalQty(updatedCart.reduce((total, item) => total + item.quantity, 0));
                    return updatedCart;
                });
            } else {
                openErrorModal(`Ürün sepetten kaldırılamadı: ${response.statusText}`);
            }
        } catch (error) {
            openErrorModal(`Bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
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
