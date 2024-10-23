// cartContext.js
import React, { useState, createContext, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (inventoryId, quantity, name) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.inventoryId === inventoryId
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.inventoryId === inventoryId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { inventoryId, quantity, name }];
      }
    });
  };

  const updateQuantity = (inventoryId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.inventoryId === inventoryId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (inventoryId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.inventoryId !== inventoryId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

export default CartContext;
