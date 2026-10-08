import { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("setcart")) || []);

  useEffect(() => {
    localStorage.setItem("setcart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      }

      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, qty: (item.qty || 1) - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalcart = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalcart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
