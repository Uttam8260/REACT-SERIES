import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        const uniqueKey = `${product.type}-${product.id}`;
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.uniqueKey === uniqueKey);
            if (existingItem) {
                return prevCart.map(item => 
                    item.uniqueKey === uniqueKey
                        ? { ...item, quantity } // replace with latest quantity
                        : item
                );
            }
            return [...prevCart, { ...product, quantity, uniqueKey }];
        });
    };

    const removeFromCart = (uniqueKey) => {
        setCart(prevCart => prevCart.filter(item => item.uniqueKey !== uniqueKey));
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
