import { createContext, useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";

export interface CartProductType {      // Sepetteki ürünleri temsil eder
    cartItemId: number; 
    productId: number;
    quantity: number; 
}

interface CartCreateType {
    productId: number;                  // Sepete ürün eklemek için gerekli veriler
    quantity: number; 
}

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[];   // Sepetin toplam ürün miktarını ve sepetteki ürünleri yönetir
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

    const apiUrl = 'https://localhost:7125/api/Cart';

    const handleAddProductToCart = useCallback(async (product: CartCreateType) => {
        if (product.productId <= 0) {
            toast.error("Geçersiz ürün ID'si.");
            return;
        }
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(product),
            });
    
            if (response.ok) {
                const result = await response.json();
                toast.success("Ürün sepete eklendi.");
                // Sepeti güncellemek için mevcut veriyi alabilirsiniz
            } else {
                const error = await response.text();
                toast.error(`Ürün sepete eklenemedi: ${error}`);
            }
        } catch (error) {
            toast.error(`Bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
        }
    }, []);
    
    const handleRemoveProductFromCart = useCallback(async (cartItemId: number) => {
        try {
            const response = await fetch(`${apiUrl}/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                },
            });

            if (response.ok) {
                toast.success("Ürün sepetten kaldırıldı.");
                setCartProducts(prev => {
                    const updatedCart = prev.filter(item => item.cartItemId !== cartItemId);
                    setCartTotalQty(updatedCart.length);
                    return updatedCart;
                });
            } else {
                const error = await response.text();
                toast.error(`Ürün sepetten kaldırılamadı: ${error}`);
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
