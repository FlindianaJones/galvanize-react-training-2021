import { createContext, useContext, useState } from 'react';

const cartProvider = createContext(undefined);
export const useCart = () => useContext(cartProvider);

export const CartContext = ({ value, children }) => {
  const [cartItems, setCartItems] = useState(value || []);

  const addItem = (car) => {
    setCartItems([...cartItems, car]);
  };

  const removeItem = (car) => {
    const newCartItems = [...cartItems]
    const cartIndex = newCartItems.indexOf(car)
    if (cartIndex >= 0) {
      newCartItems.splice(cartIndex, 1)
      setCartItems(newCartItems)
    }
  }

  return (
    <cartProvider.Provider value={{ cart: cartItems, addItem, removeItem }}>
      {children}
    </cartProvider.Provider>
  );
};
