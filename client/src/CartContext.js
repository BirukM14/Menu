import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
  
    const addToCart = (food) => {
      setCart((prevCart) => [...prevCart, food]);
    };
  
    const removeFromCart = (foodId) => {
      setCart((prevCart) => prevCart.filter(item => item.id !== foodId));
    };
  
    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  };
  
  // Custom hook to use the cart context
  export const useCart = () => {
    return useContext(CartContext);
  };