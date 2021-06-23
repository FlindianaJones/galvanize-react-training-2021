import { createContext, useContext, useState } from 'react';

const cartProvider = createContext(undefined);
export const useCart = () => useContext(cartProvider);

export const CartContext = ({ value, children }) => {
  const [cartItems, setCartItems] = useState(value || []);

  const addItem = (car) => {
    setCartItems([...cartItems, car]);
  };

  return (
    <cartProvider.Provider value={{ cart: cartItems, addItem }}>
      {children}
    </cartProvider.Provider>
  );
};
