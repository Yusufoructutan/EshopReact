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

    // Function to generate a unique ID for each cart item
    const generateUniqueCartItemId = () => {
        return Math.floor(Math.random() * 1000000); // Example ID generator
    };

    const handleAddProductToCart = useCallback((product: CartCreateType) => {
        const newCartProduct: CartProductType = {
            cartItemId: generateUniqueCartItemId(), // Assign a unique ID
            productId: product.productId,
            quantity: product.quantity,
        };

        toast.success("Product Added to cart");

        setCartProducts(prev => {
            const updatedCart = prev ? [...prev, newCartProduct] : [newCartProduct];
            setCartTotalQty(updatedCart.length);
            return updatedCart;
        });
    }, []);

    const handleRemoveProductFromCart = useCallback((cartItemId: number) => {
        if (cartProducts) {
            // Remove the item based on cartItemId
            const updatedCart = cartProducts.filter(item => item.cartItemId !== cartItemId);
            setCartProducts(updatedCart);
            setCartTotalQty(updatedCart.length);
            toast.success("Product Removed");
        }
    }, [cartProducts]);

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
