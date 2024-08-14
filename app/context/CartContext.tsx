import { useAuthStatus } from "@/hooks/useAuth";
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
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartCreateType) => void;
    handleRemoveProductFromCart: (cartItemId: number) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const isLoggedIn = useAuthStatus(); // Kullanıcı giriş durumunu kontrol edin

    // Backend API URL
    const apiUrl = 'https://localhost:7125/api/Cart';
    const handleAddProductToCart = useCallback(async (product: CartCreateType) => {
        if (!isLoggedIn) {
            toast.error("You need to be logged in to add products to the cart.");
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
                const newCartProduct: CartProductType = {
                    cartItemId: result.cartItemId,
                    productId: product.productId,
                    quantity: product.quantity,
                };
    
                toast.success("Product added to cart");
    
                setCartProducts(prev => {
                    const updatedCart = prev ? [...prev, newCartProduct] : [newCartProduct];
                    setCartTotalQty(updatedCart.length);
                    return updatedCart;
                });
            } else {
                const error = await response.text();
                toast.error(`Failed to add product to cart: ${error}`);
            }
        } catch (error) {
            toast.error(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }, [isLoggedIn]);
    
    const handleRemoveProductFromCart = useCallback(async (cartItemId: number) => {
        if (!isLoggedIn) {
            toast.error("You need to be logged in to remove products from the cart.");
            return;
        }
    
        try {
            const response = await fetch(`${apiUrl}/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            if (response.ok) {
                toast.success("Product removed from cart");
                setCartProducts(prev => prev?.filter(item => item.cartItemId !== cartItemId) || null);
                setCartTotalQty(prev => (prev || 0) - 1);
            } else {
                const error = await response.text();
                toast.error(`Failed to remove product from cart: ${error}`);
            }
        } catch (error) {
            toast.error(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }, [isLoggedIn]);
    
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
