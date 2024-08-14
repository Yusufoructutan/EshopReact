import { createContext, useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";

export interface CartProductType {
    cartItemId: number; // Unique ID for cart items
    productId: number;
    quantity: number; // Number type for quantity
}

interface CartCreateType {
    productId: number;
    quantity: number; // Number type for quantity
}

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[]; // `null` yerine boş dizi
    handleAddProductToCart: (product: CartCreateType) => Promise<void>;
    handleRemoveProductFromCart: (cartItemId: number) => Promise<void>;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[]>([]); // Başlangıçta boş dizi

    // Backend API URL
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
                toast.success("Product added to cart");
                // Sepeti güncellemek için mevcut veriyi alabilirsiniz
            } else {
                const error = await response.text();
                toast.error(`Failed to add product to cart: ${error}`);
            }
        } catch (error) {
            toast.error(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }, []);
    

    const handleRemoveProductFromCart = useCallback(async (cartItemId: number) => {
        try {
            const response = await fetch(`${apiUrl}/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Eğer token ile korunuyorsa
                },
            });

            if (response.ok) {
                toast.success("Product removed from cart");
                setCartProducts(prev => {
                    const updatedCart = prev.filter(item => item.cartItemId !== cartItemId);
                    setCartTotalQty(updatedCart.length);
                    return updatedCart;
                });
            } else {
                const error = await response.text();
                toast.error(`Failed to remove product from cart: ${error}`);
            }
        } catch (error) {
            toast.error(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
        throw new Error("useCart must be used within a CartContextProvider");
    }

    return context;
};
